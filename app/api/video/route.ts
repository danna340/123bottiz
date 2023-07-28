import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate';
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
) {
    try {
        //get the current user, and check authentication
        const {userId} = auth();

        const body = await req.json();
        //extract messages from body
        const {prompt } = body;

        //check for current user
        if(!userId){
            return new NextResponse('Unauthorized', {status: 401});
        }

        //check for messages
        if(!prompt){
            return new NextResponse('Prompt is required!', {status: 400});
        } 

        //check if user on free trial
        const freeTrial = await checkApiLimit();
        //check if pro plan
        const isPro = await checkSubscription();

        //if the user has reached the limit
        //check if free trial or expired
        if(!freeTrial && !isPro){
            return new NextResponse('You have reached your API limit! Please subscribe for more.', {status: 403});
        }

        //REPLICAT API response
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt
              }
            }
        );

        if(isPro){
            //increase the user count after succsesfull AI API response
            await incrementApiLimit();
        }

        //Final return: OPENAI Response
        return NextResponse.json(response);
        
    } catch (error) {
        console.log('[Replicate-video] response error: ', error);
        return new NextResponse('Internal error: ', {status: 500});
    }
}
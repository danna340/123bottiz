import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate'
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
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt
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
        console.log('[Replicate-music] response error: ', error);
        return new NextResponse('Internal error: ', {status: 500});
    }
}
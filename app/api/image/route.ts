import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    organization: "org-MxAojTyrFr7fWWyNPnfispCw",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

export async function POST(
    req: Request
) {
    try {
        //get the current user, and check authentication
        const {userId} = auth();

        const body = await req.json();
        //extract messages from body
        const {prompt, amount="1", resolution="512x512"} = body;

        //check for current user
        if(!userId){
            return new NextResponse('Unauthorized', {status: 401});
        }

        //check for configuration
        if(!configuration.apiKey){
            return new NextResponse('OPENAI API key not configured or expired! ', {status: 500});
        }

        //check for messages
        if(!prompt){
            return new NextResponse('Prompt is required!', {status: 400});
        } 
        //check for amount
        if(!amount){
            return new NextResponse('Amount is required!', {status: 400});
        } 
        //check for resolution
        if(!resolution){
            return new NextResponse('Resolution is required!', {status: 400});
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

        //OPENAI response
        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount,10),
            size: resolution
        });
        
        if(isPro){
            //increase the user count after succsesfull AI API response
            await incrementApiLimit();
        }

        //Final return: OPENAI Response
        return NextResponse.json(response.data.data);
        
    } catch (error) {
        console.log('[OpenAi_Conversation] response error: ', error);
        return new NextResponse('Internal error: ', {status: 500});
    }
}
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    organization: "org-MxAojTyrFr7fWWyNPnfispCw",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export async function POST(
    req: Request
) {
    try {
        //get the current user, and check authentication
        const {userId} = auth();

        const body = await req.json();
        //extract messages from body
        const {messages} = body;

        //check for current user
        if(!userId){
            return new NextResponse('Unauthorized', {status: 401});
        }

        //check for configuration
        if(!configuration.apiKey){
            return new NextResponse('OPENAI API key not configured or expired! ', {status: 500});
        }

        //check for messages
        if(!messages){
            return new NextResponse('Messages are required!', {status: 400});
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
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages]
        });

        
        if(!isPro){
            //increase the user count after succsesfull AI API response
            await incrementApiLimit();       
        }

        //Final return: OPENAI Response
        return NextResponse.json(response.data.choices[0].message);
        
    } catch (error) {
        console.log('[OpenAi_Code] response error: ', error);
        return new NextResponse('Internal error: ', {status: 500});
    }
}
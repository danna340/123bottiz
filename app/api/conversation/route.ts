import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// import { checkSubscription } from "@/lib/subscription";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

    if (!isPro) {
      await incrementApiLimit();
    }

    await incrementApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

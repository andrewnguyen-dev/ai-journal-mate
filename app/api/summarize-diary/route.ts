import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  console.log("🚀 ~ POST ~ prompt:", prompt);

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Given the conversation between AI bot and student, summarize the student's contributions 
            to the project in a concise and informative manner: \n${prompt}`,
  });

  // return result.toDataStreamResponse();
  return Response.json({ text });
}

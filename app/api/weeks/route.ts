import { getAllWeeks } from "@/data/week";

export async function GET(req: Request) {
  try {
    const weeksData = await getAllWeeks();
    if (!weeksData) {
      return new Response('No weeks found', { status: 404 });
    }
    return new Response(JSON.stringify(weeksData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
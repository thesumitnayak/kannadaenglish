import { aiEnabled } from "@/lib/ai/server";

export async function GET() {
  return Response.json({ enabled: aiEnabled() });
}

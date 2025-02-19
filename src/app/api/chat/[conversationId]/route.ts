import { generateResponse } from "@/config/GenerateResponse";
import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } =  params;
    const { userPrompt } = await req.json();

    if (!conversationId) {
      return sendResponse([], "Invalid id", false, 405);
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return sendResponse([], "conversation not found", false, 404);
    }

    const userMessage = await prisma.message.create({
      data: {
        content: userPrompt,
        role: "USER",
        conversationId: conversation.id,
      },
    });

    // generate system response
    const systemResponse = await generateResponse(userPrompt);

    // add to db
    const systemMessage = await prisma.message.create({
      data: {
        conversationId,
        content: systemResponse as string,
        role: "SYSTEM",
      },
    });

    return sendResponse(systemResponse , "success", true, 200);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return sendResponse([], "something went wrong", false, 500);
  }
}

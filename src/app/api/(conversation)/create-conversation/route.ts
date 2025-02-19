import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
    
    if (!userId) {
      return Response.json("UnAuthorized");
    }

    const createdConversation = await prisma.conversation.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    return sendResponse(createdConversation, "successfully created");
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return sendResponse([], "Something went wrong while ", false, 500);
  }
}

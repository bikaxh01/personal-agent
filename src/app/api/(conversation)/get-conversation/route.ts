import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json("UnAuthorized");
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        userId: userId,
      },
    });

    return sendResponse(conversations, "successfully created");
  } catch (error) {
    return sendResponse([], "Something went wrong while ", false, 500);
  }
}

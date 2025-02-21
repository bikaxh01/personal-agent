import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";


type Props = {
  params: Promise<{
    conversationId: string;
  }>;
};

export async function GET(
  req: Request,
  Prop:Props
) {
  try {
    const { conversationId } =await  Prop.params;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return sendResponse([], "No conversation found", false, 404);
    }

    const message = await prisma.message.findMany({
      where: {
        conversationId: conversation.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return sendResponse(message, "successfully fetched", true, 200);
  } catch (error) {
    return sendResponse([], "something went wrong", false, 500);
  }
}

import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";
import { auth } from "@clerk/nextjs/server";
import { send } from "node:process";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    let meetConnection: boolean = false;
    let gmailConnection: boolean = false;
    if (!userId) {
      return sendResponse([], "unauthorized", false, 400);
    }

    const getGmail = await prisma.email.findUnique({
      where: {
        userId,
      },
    });

    const getMeet = await prisma.meet.findUnique({
      where: {
        userId,
      },
    });

    if (getGmail) {
      gmailConnection = true;
    }

    if (getMeet) {
      meetConnection = true;
    }

    return sendResponse(
      { meetConnection, gmailConnection },
      "success",
      true,
      200
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return sendResponse([], "something went wrong", false, 500);
  }
}

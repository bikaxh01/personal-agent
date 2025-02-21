import { NextRequest } from "next/server";
import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_MEET_REDIRECT_URL
);
export async function GET(req: NextRequest) {
  const fullUrl = new URL(req.url);
  const code = fullUrl.searchParams.get("code");
  // const userId = fullUrl.searchParams.get("userId");
  const { userId } = await auth();

  if (!userId) {
    return sendResponse([], "invalid requesthhh", false, 500);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
   
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    const userInfo = await response.json();
    

    if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
      return sendResponse([], "invalid request", false, 500);
    }

    const meet = await prisma.meet.create({
      data: {
        accessToken: tokens.access_token,
        expireIn: tokens.expiry_date.toString(),
        refreshToken: tokens.refresh_token,
        emailAddress: userInfo.email,
        userId: userId,
      },
    });

    return Response.redirect(`${fullUrl.origin}/conversation`);
  
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return Response.json("Something went wrong");
  }
}

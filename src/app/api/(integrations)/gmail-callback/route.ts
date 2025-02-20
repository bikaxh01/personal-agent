import { NextRequest } from "next/server";
import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/config/PrismaClient";
import { sendResponse } from "@/config/Response";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);
export async function GET(req: NextRequest) {
  const fullUrl = new URL(req.url);
  const code = fullUrl.searchParams.get("code");
  // const userId = fullUrl.searchParams.get("userId");
  const { userId } = await auth();
  
  
  

  if(!userId){
    return sendResponse([], "invalid requesthhh", false, 500);
  }

  const { tokens } = await oauth2Client.getToken(code as string);
    
   try {
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

    const email = await prisma.email.create({
      data: {
        accessToken: tokens.access_token,
        expireIn: tokens.expiry_date.toString(),
        refreshToken: tokens.refresh_token,
        emailAddress: userInfo.email,
        userId:userId
      },
    });

    return Response.redirect(`${fullUrl.origin}/conversation`);
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return Response.json("Google calback");
  }
}

// User Info: {
//   id: '110122295239375726965',
//   email: 'bikashmi505@gmail.com',
//   verified_email: true,
//   name: 'Bikash Mishra',
//   given_name: 'Bikash',
//   family_name: 'Mishra',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocK2ZmMpnZ-EcRrRvuwpeG1KiZ2FdVdTJz6WTG-xDhmZL6NE6A=s96-c'
// }
// 🚀 ~ GET ~ tokens: {
//   access_token: 'ya29.a0AXeO80Q7cy2pbvDmslBteY5IJ4o0mtHevAcTfaiOMPyBb9ZXl2EfivXaqqw5L_IId13j3wRZt1gPIVmwFrp0sjnD6kJ6IybN0YdiCH2fm_Tipr-rrKQ6npjkqLM09bF4whNldhQx13tj8ZIR8OpyjoxZtKRQ3u8m5XKUHYhOaCgYKAeISAQ4SFQHGX2Mi6fy4IBgPAYisCOnD1pZhFA0175',
//   refresh_token: '1//0glyqgqrb8sdWCgYIARAAGBASNwF-L9IrW21kQnNpkGRotOdQXOxRxL-inSflPXdwt-Q3fEKF3iiUAMTSVwS7lUQXA2Esstf6m38',
//   scope: 'https://www.googleapis.com/auth/userinfo.email https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile openid',
//   token_type: 'Bearer',
//   id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMTJhYjc4MmNiNjA5NjI4NWY2OWU0OGFlYTk5MDc5YmI1OWNiODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODE2NDE0MzAwMTMtb2Zuc2dyb2YxZmowNGk2ZHE4b3VncWZram1mNXU5cHAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODE2NDE0MzAwMTMtb2Zuc2dyb2YxZmowNGk2ZHE4b3VncWZram1mNXU5cHAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAxMjIyOTUyMzkzNzU3MjY5NjUiLCJlbWFpbCI6ImJpa2FzaG1pNTA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiXzdmQnh2YmRNOUc5bTNJNVdYUmVpZyIsIm5hbWUiOiJCaWthc2ggTWlzaHJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0syWm1NcG5aLUVjUnJSdnV3cGVHMUtpWjJGZFZkVEp6NldURy14RGhtWkw2TkU2QT1zOTYtYyIsImdpdmVuX25hbWUiOiJCaWthc2giLCJmYW1pbHlfbmFtZSI6Ik1pc2hyYSIsImlhdCI6MTczOTgwNTg4NiwiZXhwIjoxNzM5ODA5NDg2fQ.VfbjKnlyjSEWi5naj84P_1cm8F5ZDbiBAXUj40eyAzPXErBqRwd1bl0o7wMpJneaVcsW9HlF3qBrs1n6MMQDEfFFek6-DL-WzrexAGFxOiSWcaGKNArQNoFoq_9PakUoRImTgdNluISyQG2Silx1-coOIEuPR2B5VtY5S24HRcwlFFF46YzN1AK63bdCb3bIqU4fuBJQv60isPZzHGxWSlj47uODH3EFv13NmeTiNM6FQc6GZQK8PcI0cs_FoV8VlnfIezZjEynwfogbY2BeOAVSGmIJRqmLGuehGRrQewOHpOw2P4qzusQTRg2YNOMP3lB8LwQ3FrM9mK5k7uEXSg',
//   refresh_token_expires_in: 604799,
//   expiry_date: 1739809487938
// }

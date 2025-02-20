import { sendResponse } from "@/config/Response";
import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export function GET(req: Request) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://mail.google.com/",
      " https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  // console.log("🚀 ~ GET ~ authUrl:", process.env.GOOGLE_REDIRECT_URL);

  // console.log("🚀 ~ GET ~ authUrl:", authUrl);
  return sendResponse(authUrl, "url generated", true, 200);
}

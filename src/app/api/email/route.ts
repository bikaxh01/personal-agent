import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export function GET(req: Request) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // To get refresh token
    prompt: "consent", // Force consent to always get a refresh token
    scope: [
      "https://mail.google.com/",
      " https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  console.log("🚀 ~ GET ~ authUrl:", process.env.GOOGLE_REDIRECT_URL);

  console.log("🚀 ~ GET ~ authUrl:", authUrl);
  return Response.redirect(authUrl);
}

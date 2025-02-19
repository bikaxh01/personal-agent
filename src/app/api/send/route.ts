import { google } from "googleapis";

const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// After the user has authenticated, you'll have an access token
oauth2Client.setCredentials({
  access_token:
    "ya29.a0AXeO80Ql6VzdzArMzKrG0vo9hlUyeURUSB9DhULajh3LELa_C_v7Lq5O1r7oXPZSsEW66yDeaxCY0-ILve5Z0r1QxmT3ZhqNzrfGezwSZePWe4zWS0kA8ZkLN09P_81cIdJjKF2aDEdmfj7GVC0HbrSt4apsDtQOOYq44flBaCgYKAfISARMSFQHGX2MiBIyg9Uw_xKNPHY5rXurDuA0175",
  refresh_token:
    "1//0gYQnF8iUbZEHCgYIARAAGBASNgF-L9IrLnD9kbEt4JUXNTJJoaSqBE4BgeiT1hs0CR_NJfSpj-ZMcuSQnT33Aor7ZM0e9frbyw",
});

export async function GET(req: Request) {
  sendEmail(oauth2Client, "mishrabikash202@gmail.com", "test123", "hello using api");

  return Response.json("OK");
}

async function sendEmail(auth, to, subject, message) {
  console.log("🚀 ~ sendEmail ~ auth:", auth)
  const gmail = google.gmail({ version: "v1" ,auth});

  const rawMessage = createEmail(to, subject, message);

  try {
    const res = await gmail.users.messages.send({
      userId: "me", // 'me' refers to the authenticated user's Gmail account
      requestBody: {
        raw: rawMessage,
      },
    });
    console.log("Email sent successfully:", res.data);
  } catch (error) {
    console.log("Error sending email🔴🔴🔴:", error);
  }
}

const createEmail = (to, subject, message) => {
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=UTF-8`,
    "",
    message,
  ].join("\n");

  return Buffer.from(email).toString("base64");
};



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

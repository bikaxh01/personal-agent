import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./PrismaClient";

const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
  // process.env.GOOGLE_GMAIL_REDIRECT_URL
);

const multiply = tool(
  async ({ a, b }: { a: number; b: number }) => {
    return `${a * b}`;
  },
  {
    name: "multiply",
    description: "Multiply two numbers together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }: { a: number; b: number }) => {
    return `${a + b}`;
  },
  {
    name: "add",
    description: "Add two numbers together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  }
);

const sendMail = tool(
  async ({
    to,
    message,
    subject,
  }: {
    to: string;
    message: string;
    subject: string;
  }) => {
    try {
      const { userId } = await auth();

      if (!userId)
        return `{ status: "Error", message: "user is not authenticated" }`;
      const gmail = google.gmail({ version: "v1", auth: oauth2Client });

      const userToken = await prisma.email.findUnique({
        where: {
          userId,
        },
      });

      if(!userToken){
        return "please connect goggle account to send email  "
      }
      oauth2Client.setCredentials({
        access_token: userToken?.accessToken,
        refresh_token: userToken?.refreshToken,
      });

      // create email
      const email = [
        `To: ${to}`,
        `Subject: ${subject}`,
        `Content-Type: text/plain; charset=UTF-8`,
        "",
        message,
      ].join("\n");

      const rawMessage = Buffer.from(email).toString("base64");
      const emailRes = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: rawMessage,
        },
      });

      return `{ status: "success", message: "email sent successfully" }`;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return `{ status: "Error", message: "Something went wrong" }`;
    }
  },
  {
    name: "sendMail",
    description: "This tool can be used to send email to any email address ",
    schema: z.object({
      to: z.string().describe(" The receiver/recipient email address "),
      message: z.string().describe("Body/message of the email"),
      subject: z.string().describe("Subject of the email "),
    }),
  }
);

const getEmailAddress = tool(
  async () => {
    return `{
  Bikash Mishra: mishrabikash202@gmail.com
  Bishal Mishra: bikashimishra12@gmail.com
  Prem Mishra: bellbottomwwe@gmail.com
  }`;
  },
  {
    name: "getEmailAddress",
    description:
      "This tool can be used to  get receiver/recipient email address",
  }
);

const createMeet = tool(
  async () => {
    try {
      const meet = google.meet({ version: "v2", auth: oauth2Client });
      const { userId } = await auth();

      if (!userId)
        
        
        return `{ status: "Error", message: "user is not authenticated" }`;
      const gmail = google.gmail({ version: "v1", auth: oauth2Client });

      const userToken = await prisma.meet.findUnique({
        where: {
          userId,
        },
      });

      if(!userToken){
     
        return "please connect goggle account to create meet  "
      }

      oauth2Client.setCredentials({
        access_token: userToken?.accessToken,
        refresh_token: userToken?.refreshToken,
      });
      const meetRes = await meet.spaces.create({
        requestBody: {},
      });

      return `${meetRes.data.meetingUri}`;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "something went wrong while creating meet";
    }
  },
  {
    name: "createMeet",
    description: "This tool can be used to create google meet ",
  }
);

export const tools = [add, multiply, sendMail, getEmailAddress, createMeet];

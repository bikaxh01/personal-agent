import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { SystemMessage, ToolMessage } from "@langchain/core/messages";

const API_KEY = process.env.OPEN_AI_KEY

const llm = new ChatOpenAI({
  apiKey: API_KEY,
  model: "gpt-4o",
  temperature: 0,
});



const tools = [add, multiply];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

async function llmCall(state: typeof MessagesAnnotation.State) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs. NOTE: response should be in markdown format",
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}







export async function GET(req: Request) {
  const messages = [
    {
      role: "user",
      content: "write a code to sum two number in python,js and go",
    },
  ];
  const result = await agentBuilder.invoke({ messages });

  console.log(
    "🚀 ~ GET ~ result:",
    result.messages[result.messages.length - 1].content
  );
  return Response.json({
    data: result.messages[result.messages.length - 1].content,
  });
}

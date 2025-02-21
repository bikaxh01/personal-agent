import { tools } from "./Tools";
import { ChatOpenAI } from "@langchain/openai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { SystemMessage, ToolMessage } from "@langchain/core/messages";
import { prisma } from "./PrismaClient";
import { Message } from "@/components/common/ChatComponent";
import { message } from "@prisma/client";

type Message = {
  role: "USER" | "SYSTEM";
  content: string;
};
const API_KEY = process.env.OPEN_AI_KEY;

const llm = new ChatOpenAI({
  apiKey: API_KEY,
  model: "gpt-4o",
  temperature: 0,
});

const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

export async function generateResponse(
  userPrompt: string,
  allMessages: Message[]
) {
  const filteredAllMessage = allMessages.map((msg) => {
    // const message = {
    //   role: msg.role === "USER" ?msg.role.toLowerCase():
    // }
    return {
      role: msg.role.toLocaleLowerCase(),
      content: msg.content,
    };
  });

  const messages = [
    ...filteredAllMessage,

    {
      role: "user",
      content: userPrompt,
    },
  ];

  const result = await agentBuilder.invoke({ messages });

  return result.messages[result.messages.length - 1].content;
}

async function llmCall(state: typeof MessagesAnnotation.State) {
  // LLM decides whether to call a tool or not
  const prevMessages = await prisma.message.findMany();
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful AI Agent access to different tools you task is to observe the user prompt and think whether the user want to do any task then perform that task by calling te tool   ",
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}

async function toolNode(state: typeof MessagesAnnotation.State) {
  // Performs the tool call
  const results: ToolMessage[] = [];
  const lastMessage = state.messages.at(-1);

  if (lastMessage?.tool_calls?.length) {
    for (const toolCall of lastMessage.tool_calls) {
      const tool = toolsByName[toolCall.name];
      const observation = await tool.invoke(toolCall.args);
      results.push(
        new ToolMessage({
          content: observation,
          tool_call_id: toolCall.id,
        })
      );
    }
  }

  return { messages: results };
}

// Conditional edge function to route to the tool node or end
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    // Name returned by shouldContinue : Name of next node to visit
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

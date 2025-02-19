import axios from "axios";

export async function getSystemResponse({
  userPrompt,
  conversationId,
}: {
  userPrompt: string;
  conversationId: string;
}) {
  try {
    if (!userPrompt || !conversationId) {
      throw new Error("Invalid inputs");
    }

    const res = await axios.post(`/api/chat/${conversationId}`, { userPrompt });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getAllMessages({
  conversationId,
}: {
  conversationId: string;
}) {
  try {
    if ( !conversationId) {
      throw new Error("Invalid inputs");
    }

    const res = await axios.get(`/api/get-messages/${conversationId}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}



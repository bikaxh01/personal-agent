import axios from "axios";

export async function createConversation(title: string) {
  
  try {
    const res = await axios.post("/api/create-conversation", { title });
    return res.data;
  } catch (error) {
    return new Error("something went wrong");
  }
}

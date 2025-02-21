import axios from "axios";

export async function checkIntegrations() {
  try {
    const res = await axios.get("/api/check-integrations");
    return res.data.data;
  } catch (error:any) {
    console.log("🚀 ~ checkIntegrations ~ error:", error);
    return error.message;
  }
}

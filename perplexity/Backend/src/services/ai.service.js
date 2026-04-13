import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "langchain";
import axios from "axios";

// 🔥 REAL-TIME SEARCH FUNCTION
async function searchInternet(query) {
  try {
    const res = await axios.get(
      `https://serpapi.com/search.json?q=${query}&api_key=${process.env.SERP_API_KEY}`
    );

    const results = res.data.organic_results || [];

    return results
      .slice(0, 5)
      .map((r) => `${r.title}: ${r.snippet}`)
      .join("\n");
  } catch (err) {
    console.error("Search Error:", err.message);
    return "No real-time data found";
  }
}

// 🔥 MAIN AI RESPONSE
export async function generateResponse(messages) {
  try {
    const mistralModel = new ChatMistralAI({
      model: "mistral-medium-latest",
      apiKey: process.env.MISTRAL_API_KEY,
    });

    const lastUserMessage = messages[messages.length - 1]?.content;

    // ✅ Force real-time data
    const realtimeData = await searchInternet(lastUserMessage);

    const currentDate = new Date().toDateString();

    const response = await mistralModel.invoke([
      new SystemMessage(`
You are a real-time AI assistant like ChatGPT + Perplexity.

RULES:
- Today date is: ${currentDate}
- Always use real-time data if available
- Never give outdated answers (like 2024)
- Answer must be current (2026)
- Do NOT use markdown symbols (** # - etc.)
- Keep answer clean and readable
      `),

      new HumanMessage(`
User Question:
${lastUserMessage}

Real-time Data:
${realtimeData}

Give final answer:
      `),
    ]);

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Something went wrong while generating response";
  }
}

// 🔥 CHAT TITLE GENERATOR (FIXES YOUR ERROR)
export async function generateChatTitle(message) {
  try {
    return message
      .slice(0, 40)
      .replace(/[*_`#>-]/g, "")
      .trim();
  } catch {
    return "New Chat";
  }
}
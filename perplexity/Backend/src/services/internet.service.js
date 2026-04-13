import { tavily as Tavily } from "@tavily/core";

export const searchInternet = async ({ query }) => {
    const tavily = Tavily({
        apiKey: process.env.TAVILY_API_KEY,
    });

    const results = await tavily.search(query, {
        maxResults: 5,
    });

    console.log(JSON.stringify(results));

    return JSON.stringify(results);
};
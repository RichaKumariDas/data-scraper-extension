// src/api.js
// Handles Gemini API requests (summarizing scraped data)

const GEMINI_API_KEY = "AIzaSyCx7_Ms2i36LpLMEoUlZJ_1aRJFId3kst8";

/**
 * Sends text to Gemini API and gets a summarized response.
 * @param {string} text - The scraped data to summarize.
 * @returns {Promise<string>} - The summarized text.
 */
export const summarizeWithGemini = async (text) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Summarize this data clearly:\n\n${text}` },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated."
    );
  } catch (error) {
    console.error("Error summarizing with Gemini:", error);
    return "Could not generate summary.";
  }
};

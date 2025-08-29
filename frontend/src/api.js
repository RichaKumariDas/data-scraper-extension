// src/api.js
// Handles external API requests (keeps logic modular & separate)

/**
 * Fetches random advice from the Advice Slip API.
 * @returns {Promise<string>} - A piece of advice or a fallback message.
 */
export const fetchAdvice = async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice; // return advice text
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Could not fetch advice."; // fallback on error
  }
};

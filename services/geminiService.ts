import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const detectLanguage = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "N/A";
  }

  const prompt = `Detect the language of the following text. Respond with only the name of the language (e.g., "English", "Spanish", "Japanese"). Do not add any other words, explanation, or punctuation.

Text: "${text}"`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
    });
    const language = response.text.trim();
    // A simple validation to ensure the response is a single or two-word language name
    if (language && language.length < 30 && !language.includes('\n')) {
        return language;
    }
    return "Could not determine";
  } catch (error) {
    console.error("Error detecting language with Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
};

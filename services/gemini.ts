
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Polishes the provided text using Gemini-3-flash-preview.
 * Makes it sound professional yet personal.
 */
export const polishText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Poli o seguinte texto para que soe profissional, confiante, mas ainda pessoal e autêntico: "${text}"`,
      config: {
        systemInstruction: "Tu és um assistente de escrita especializado em tornar textos mais elegantes e polidos sem perder a essência do autor.",
        temperature: 0.7,
      },
    });

    return response.text || text;
  } catch (error) {
    console.error("Error polishing text with Gemini:", error);
    return text;
  }
};

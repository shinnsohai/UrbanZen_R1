import { GoogleGenAI } from "@google/genai";

// API_KEY is expected to be set in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectDescription = async (title: string, imageBase64: string, mimeType: string): Promise<string> => {
  try {
    const textPart = {
      text: `You are an expert interior design copywriter for a Singapore-based company called URBAN ZEN. Your tone is inspiring, sophisticated, and calming.
      Analyze the provided image of a home interior. Then, generate a compelling and inspiring project description for this project, which is titled "${title}".
      Describe the visual elements: style (e.g., minimalist, modern, industrial), color palette, key materials, and overall mood.
      Connect the design to the Singaporean lifestyle (e.g., making a small HDB feel spacious, luxury condo living).
      Keep the description to one or two concise paragraphs, around 50-70 words.
      Do not describe what is in the image literally, but what feeling it evokes.`
    };

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description. Please check your API key and try again.");
  }
};

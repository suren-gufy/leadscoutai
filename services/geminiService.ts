import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessContact } from "../types";

// Schema definition for structured output
const businessListSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The name of the business" },
      website: { type: Type.STRING, description: "The website URL of the business" },
      phone: { type: Type.STRING, description: "Phone number if available, else null", nullable: true },
      email: { type: Type.STRING, description: "Email address if available, else null", nullable: true },
      address: { type: Type.STRING, description: "Physical address if available, else null", nullable: true },
      description: { type: Type.STRING, description: "A brief 1 sentence description of what they do" }
    },
    required: ["name", "website", "description"]
  }
};

export const findBusinesses = async (niche: string, location: string, count: number): Promise<BusinessContact[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    I need you to act as a lead generation research assistant.
    
    Task: Find ${count} real businesses for the niche "${niche}" located in or serving "${location}".
    
    Instructions:
    1. Use Google Search to find exactly ${count} specific businesses matching this criteria.
    2. For each business, extract the following details from the search results:
       - Business Name
       - Website URL
       - Phone Number (if visible in snippets/maps data)
       - Email Address (if visible in snippets)
       - Physical Address (if applicable)
       - Short description
    
    Constraints:
    - Return the data strictly as a JSON array matching the schema.
    - If a specific field (like email) is not found in the search snippets, return null for that field.
    - Ensure the websites are valid.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: businessListSchema,
        systemInstruction: "You are a helpful data extraction assistant. You always output valid JSON.",
      },
    });

    const text = response.text;
    if (!text) {
      return [];
    }

    // Parse the JSON response
    const data = JSON.parse(text) as BusinessContact[];
    return data;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw new Error("Failed to fetch business data. Please try again.");
  }
};
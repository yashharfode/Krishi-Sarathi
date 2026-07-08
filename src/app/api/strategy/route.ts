import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert agricultural AI assistant in India. 
      Analyze the following Farm Profile and recommend the single best crop strategy.
      
      Farm Profile:
      - Size: ${profile.size} Acres
      - Location: ${profile.location}
      - Soil Type: ${profile.soilType}
      - Irrigation: ${profile.irrigation}
      
      Return ONLY a valid JSON object with no markdown formatting or backticks. 
      The JSON must exactly match this structure:
      {
        "name": "Crop Name (e.g., Commercial Soybean)",
        "profit": <number representing estimated profit in INR>,
        "riskLevel": "Low" | "Medium" | "High",
        "suitability": <number between 1 and 100>
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean up potential markdown blocks if the model ignored the instruction
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const strategy = JSON.parse(jsonStr);
    
    // Add generation timestamp
    strategy.generatedAt = new Date().toISOString();

    return NextResponse.json({ strategy });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategy." },
      { status: 500 }
    );
  }
}

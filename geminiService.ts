
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the "MCP Server" toolset
const findVendorsTool: FunctionDeclaration = {
  name: "get_vendor_recommendations",
  description: "Queries the vendor intelligence database to find the top carriers for a specific route and weight.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      origin: { type: Type.STRING, description: "Origin city or port" },
      destination: { type: Type.STRING, description: "Destination city or port" },
      weight_kg: { type: Type.NUMBER, description: "Total weight of the shipment in KG" }
    },
    required: ["origin", "destination", "weight_kg"]
  }
};

const shipmentRiskTool: FunctionDeclaration = {
  name: "analyze_shipment_risk",
  description: "Predicts the probability of delay or exception for a specific shipment ID and retrieves its current transit details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      shipment_id: { type: Type.STRING, description: "The unique shipment ID (e.g. SHP-90021, SHP-90022)" }
    },
    required: ["shipment_id"]
  }
};

const vendorAnalyticsTool: FunctionDeclaration = {
  name: "get_vendor_analytics",
  description: "Retrieves performance statistics, reliability scores, and historical data for a specific vendor or carrier.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      vendor_name: { type: Type.STRING, description: "The name of the vendor/carrier (e.g. Swift Logistics, Heavy Haul Co)" }
    },
    required: ["vendor_name"]
  }
};

export const getAIResponse = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        tools: [{ functionDeclarations: [findVendorsTool, shipmentRiskTool, vendorAnalyticsTool] }],
        systemInstruction: `You are the LogiIntel Orchestrator operating in an MCP (Model Context Protocol) environment.
        
        CRITICAL RULES:
        1. If a message contains an ID like 'SHP-XXXXX', you MUST use 'analyze_shipment_risk'.
        2. If a message mentions shipping goods between cities, you MUST use 'get_vendor_recommendations'.
        3. If a message asks for analytics, performance, or stats of a specific vendor, you MUST use 'get_vendor_analytics'.
        4. After the tool call, summarize the finding. 
        5. For SHP-90021: It is a 'Healthy' shipment from Shanghai to LA with Low Risk.
        6. For SHP-90022: it is a 'Delayed' shipment from Berlin to Chicago with High Risk.
        7. Always present findings professionally and refer to the specific vendor name provided.`
      }
    });

    const functionCalls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
    
    if (functionCalls && functionCalls.length > 0) {
      return {
        text: response.text,
        toolCall: functionCalls[0].functionCall
      };
    }

    return { text: response.text };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "The logistics server is currently disconnected. Please check your connection." };
  }
};

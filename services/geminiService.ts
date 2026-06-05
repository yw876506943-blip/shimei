
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSkinAdvice = async (metrics: { hydration: number; elasticity: number; oiliness: number }) => {
  const prompt = `Based on these skin metrics (Hydration: ${metrics.hydration}%, Elasticity: ${metrics.elasticity}%, Oiliness: ${metrics.oiliness}%), provide a short, professional beauty advice (max 50 words) in Chinese for a beauty device user.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional skincare expert and beauty device consultant. Answer in Chinese.",
        temperature: 0.7,
      }
    });
    return response.text || "保持补水，建议配合EMS微电流模式提升弹性。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "您的肤质正在改善，建议继续坚持日常护理。";
  }
};

export const generatePlan = async (skinType: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `为${skinType}肤质制定一个简单的3步美容仪使用方案。`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.STRING },
                            mode: { type: Type.STRING },
                            duration: { type: Type.STRING }
                        },
                        required: ["step", "mode", "duration"]
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (e) {
        return [
            { step: "深层清洁", mode: "CLEAN", duration: "3 min" },
            { step: "紧致提升", mode: "EMS", duration: "5 min" },
            { step: "锁水保湿", mode: "RF", duration: "2 min" }
        ];
    }
}

import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const analyzeImage = async (base64Image) => {
  try {
    // Mock response for now to save API credits during dev
    console.log("Analyzing image...");
    
    // In production, you would send the image to OpenAI or Gemini here
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Identify these ingredients and suggest 3 healthy meals with calories." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
          ],
        },
      ],
    });
    return response.choices[0].message.content;
    */

    return [
      { name: "Grilled Chicken Salad", calories: 450, ingredients: ["Chicken", "Lettuce", "Tomatoes"] },
      { name: "Vegetable Stir Fry", calories: 320, ingredients: ["Peppers", "Onions", "Broccoli"] },
      { name: "Omelette", calories: 280, ingredients: ["Eggs", "Cheese", "Spinach"] }
    ];
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

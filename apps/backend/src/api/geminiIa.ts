import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY_GEMINI_IA as string;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig
});

export async function Instructions() {
  try {
    const prompt = `Gere temas diferentes para jogo de forca,
    tem que haver no mínimo de 5 a 10 temas diferentes sem repetir,
    cada um desses temas tem que ter no mínimo de 20 a 50 palavras (words).
    Seu modelo deve ser em .json e tem que seguir essa estrutura cada tema: 
    [{
    "name": "Comidas",
    "words": [
      {
        "name": "PIZZA",
        "dica": "Prato italiano popular, consistindo em uma base de massa coberta com molho de tomate, queijo e uma variedade de ingredientes"
      },
    },
    {
    "name": "Animais",
    "words": [
      {
        "name": "LEÃO",
        "dica": "Grande felino conhecido por sua juba"
      },
    },
    {
    "name": "Aleatório",
    "words": [
      {
        "name": "EXTRAVAGANTE",
        "dica": "Que chama a atenção pela extravagância ou excentricidade."
      },
    }]`;
    const result = await model.generateContent(prompt);
    return result.response.text()
  } catch (err) {
    console.log("Error: ", err);
    return '[]'
  }
}
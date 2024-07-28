import { database, ref, update } from "common";
import { Instructions } from "./api/geminiIa";

export async function saveAITheme() {
  const IAData = await Instructions();
  const cleanedInput = IAData.replace(/```json/g, '').replace(/```/g, '');
  const ia = JSON.parse(cleanedInput);

  if (Array.isArray(ia) && ia.length > 0) {
    const updates: any = {};
    updates[`hangman/themesIA`] = {
      ...ia
    }
    update(ref(database), updates);
  }
}
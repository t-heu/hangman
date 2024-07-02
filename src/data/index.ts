import animals from './animals.json';
import car_brands from './car_brands.json';
import color from './color.json';
import science_tech from './science_tech.json';
import food from './food.json';
import fruits from './fruits.json';
import parts_human_body from './parts_human_body.json';
import super_heroes from './super_heroes.json';
import random from './random.json';
import { database, ref, update, get, child } from '../api/firebase';
// import test from './test.json';

interface IWord {
  name: string;
  dica: string;
}

export interface IThemeData {
  name: string;
  words: IWord[];
}

export interface ITheme {
  [key: string]: () => IThemeData;
}

const localTheme: ITheme = {
  0: () => random,
  1: () => animals,
  2: () => food,
  3: () => fruits,
  4: () => color,
  5: () => super_heroes,
  6: () => science_tech,
  7: () => car_brands,
  8: () => parts_human_body,
  // 9: () => test
}

/*
async function saveAITheme() {
  const updates: any = {};
  updates[`hangman/themesIA`] = {
    ...ia
  }
  update(ref(database), updates);
}*/

const convertThemeDataToIThemeModel = (data: IThemeData): IThemeData => {
  return {
    ...data
  };
};

const loadThemes = async (): Promise<ITheme> => {
  try {
    const snapshot = await get(child(ref(database), 'hangman/themesIA'));
    if (snapshot.exists()) {
      const iaThemes: ITheme = snapshot.val().reduce((acc: ITheme, curr: any, index: number) => {
        acc[index.toString()] = () => convertThemeDataToIThemeModel(curr);
        return acc;
      }, {} as ITheme);

      return { ...iaThemes };
    } else {
      return { ...localTheme };
    }
  } catch (error: any) {
    console.error(`Erro ao verificar as salas: ${error.message}`);
    return { ...localTheme };
  }
}
 
export const getThemes = async () => {
  const themes: ITheme = await loadThemes();
  
  const allThemes = Object.keys(themes).map(locale => ({
    [locale]: themes[locale]()
  }));

  return { themes: allThemes };
};

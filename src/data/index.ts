import animals from './animals.json';
import car_brands from './car_brands.json';
import color from './color.json';
import science_tech from './science_tech.json';
import food from './food.json';
import fruits from './fruits.json';
import parts_human_body from './parts_human_body.json';
import super_heroes from './super_heroes.json';
import random from './random.json';
// import test from './test.json';

interface IThemeModel {
  name: string;
  words: {
    name: string;
    dica: string;
  }[];
}

interface ITheme {
  [key: string]: () => IThemeModel;
}

const themes: ITheme = {
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
 
export const getthemes = () => {
  const allThemes = Object.keys(themes).map(locale => ({
    [locale]: themes[locale]()
  }));
  return { themes: allThemes };
};

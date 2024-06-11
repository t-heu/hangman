import animals from './animals.json';
import car_Brands from './car_Brands.json';
import continents from './continents.json';
import countries from './countries.json';
import food from './food.json';
import fruits from './fruits.json';
import parts_of_the_human_body from './parts_of_the_human_body.json';
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
  4: () => super_heroes,
  5: () => continents,
  6: () => countries,
  7: () => car_Brands,
  8: () => parts_of_the_human_body,
  // 9: () => test
}
 
export const getthemes = () => {
  const allThemes = Object.keys(themes).map(locale => ({
    [locale]: themes[locale]()
  }));
  return { themes: allThemes };
};

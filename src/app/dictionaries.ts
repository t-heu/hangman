import en from './dictionaries/en.json';
import pt from './dictionaries/pt.json';

interface LanguageDictionary {
  [key: string]: {
    [key: string]: string;
  }
}

interface LanguageDictionaries {
  [key: string]: () => LanguageDictionary;
}

const dictionaries: LanguageDictionaries = {
  en: () => en,
  pt: () => pt,
}
 
export const getDictionary = (locale: string) => dictionaries[locale]();
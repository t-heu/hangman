import {getThemes} from '../data';

export default async function generateTheme(checked: number) {
  const { themes } = await getThemes();
  const scheme = themes[checked][checked].words;
  const num = scheme.length - 1;
  const randomIndex = Math.round(Math.random() * num);
  
  const selectedWord = scheme[randomIndex];
  const wordArray = Array(selectedWord.name.length).fill('');
  
  return {wordArray, selectedWord};
}

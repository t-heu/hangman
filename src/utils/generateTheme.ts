import {getthemes} from '../data';

export default function generateTheme(checked: number) {
  const scheme = getthemes().themes[checked][checked].words;
  const num = scheme.length - 1;
  const randomIndex = Math.round(Math.random() * num);
  
  const selectedWord = scheme[randomIndex];
  const wordArray = Array(selectedWord.name.length).fill('');
  
  return {wordArray, selectedWord};
}

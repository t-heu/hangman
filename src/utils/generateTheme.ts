import DataTheme from '../data/themes.json';

export default function generateTheme(checked: number) {
  const scheme = DataTheme.themes[checked].words;
  const num = scheme.length - 1;
  const randomIndex = Math.round(Math.random() * num);
  
  const selectedWord = scheme[randomIndex];
  const wordArray = Array(selectedWord.name.length).fill('');

  return {wordArray, selectedWord};
}
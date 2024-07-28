export default function generateRandomWord(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomWord = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters.charAt(randomIndex);
  }
  return randomWord;
}

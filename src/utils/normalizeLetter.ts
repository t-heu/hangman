// Função para normalizar uma string removendo acentos
export function normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Função para verificar se a letra está na palavra e retorna o índice
export function checkLetter(word: string, guessedLetter: string): boolean[] {
  const normalizedWord = normalize(word);
  const normalizedLetter = normalize(guessedLetter);

  return normalizedWord.split('').map(char => char === normalizedLetter);
}
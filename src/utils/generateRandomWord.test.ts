import generateRandomWord from './generateRandomWord';

describe('generateRandomWord', () => {
  it('should generate a random word of specified length', () => {
    const length = 6;
    const randomWord = generateRandomWord(length);

    // Verificar se a palavra tem o comprimento correto
    expect(randomWord.length).toBe(length);

    // Verificar se a palavra consiste apenas de caracteres maiúsculos
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let char of randomWord) {
      expect(characters).toContain(char);
    }
  });
});

import generateTheme from "./generateTheme"

jest.mock('../data', () => ({
  getthemes: jest.fn(() => ({
    themes: [
      [
        {
          name: "Animais",
          words: [
            {
              "name": "LEAO",
              "dica": "Grande felino conhecido por sua juba"
            },
            {
              "name": "ELEFANTE",
              "dica": "Maior mamífero terrestre, caracterizado por sua tromba"
            }
          ]
        }
      ]
    ]
  }))
}));

describe('generateTheme', () => {
  it('deve gerar um tema válido', () => {
    // Defina o valor de "checked" para o teste
    const checked = 0; // Indicando o primeiro tema

    // Chame a função que está sendo testada
    const theme = generateTheme(checked);

    // Asserte o resultado esperado
    expect(theme).toHaveProperty('wordArray');
    expect(theme).toHaveProperty('selectedWord');
    expect(theme.wordArray).toHaveLength(theme.selectedWord.name.length);
  });

  // Teste adicional para garantir que o tema selecionado seja válido
  it('deve selecionar uma palavra válida dentro do tema', () => {
    const checked = 0; // Indicando o primeiro tema

    const theme = generateTheme(checked);

    expect(theme.selectedWord).toHaveProperty('name');
    expect(theme.selectedWord).toHaveProperty('dica');
  });
});
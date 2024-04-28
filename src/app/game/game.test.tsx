import React from 'react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import Game from './page';
import lang from "../dictionaries/pt.json";

// Mock das funções e props necessárias para o teste
jest.mock('../../api/firebase', () => ({
  ref: jest.fn(),
  update: jest.fn(),
  onValue: jest.fn((ref, callback) => callback({ val: jest.fn() })),
  onDisconnect: jest.fn(() => ({
    remove: jest.fn(),
  })),
  remove: jest.fn(),
}));
  
// Mock do tema
jest.mock('../../utils/generateTheme', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    selectedWord: { name: 'TEST', dica: 'Teste' },
    wordArray: ['', '', '', '']
  }))
}));

describe('Game component', () => {
  it('matches snapshot', () => {
    const code = '123';
    const currentPlayerUID = 'asfasasasfa';
    const indexTheme = 0;

    const tree = renderer.create(
      <Game 
        lang={lang.game} 
        changeComponent={jest.fn()}
        code={code}
        currentPlayerUID={currentPlayerUID}
        indexTheme={indexTheme}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renderiza corretamente e lida com comportamento do game', () => {
    const changeComponent = jest.fn();
    const code = '';
    const currentPlayerUID = '';
    const indexTheme = 0;
  
    const { getByText, getAllByText } = render(
      <Game
        lang={lang.game}
        changeComponent={changeComponent}
        code={code}
        currentPlayerUID={currentPlayerUID}
        indexTheme={indexTheme}
      />
    );
  
    // Verifica se a dica é renderizada corretamente
    expect(getByText('Dica: Teste')).toBeInTheDocument();

    fireEvent.click(getAllByText('T')[0]);
    fireEvent.click(getAllByText('E')[0]);
  
    // Verifica se as letras da palavra são renderizadas corretamente
    const textElements = ['T', 'E', '', 'T'];
    textElements.forEach((text, i) => {
      const allByText = getAllByText(text);
      allByText.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });

    // Simula a seleção de uma letra
    fireEvent.click(getAllByText('O')[0]);
    // Verifica se a letra selecionada é renderizada corretamente
    expect(getByText('Errors: 1')).toBeInTheDocument();

    // Simula a seleção de uma letra
    fireEvent.click(getAllByText('E')[1]);
    // Verifica se a letra selecionada é renderizada corretamente
    expect(getByText('Jà foi usada letra: E')).toBeInTheDocument();
  
    // Simula a seleção de uma letra
    fireEvent.click(getAllByText('S')[0]);
    expect(getByText('VOCÊ GANHOU!')).toBeInTheDocument();
  });
});
  
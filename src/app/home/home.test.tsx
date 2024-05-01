import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';

import lang from "../dictionaries/pt.json"

const data = {
  ABCDEF: {
    turn: 'p1',
    indexTheme: 4,
    gameInProgress: false,
    selectedLetters: Array('-'),
    wordArray: Array('-'),
    selectedWord: {name: '', dica: ''},
    players: {
      "p-NwnnNoN2L4y3thEVfj6": {
        active: true,
        gameover: false,
        name: "Theu A",
        owner: false,
        ready: false,
        uid: "-NwnnNoN2L4y3thEVfj6",
        victory: false,
      }
    }
  }
}

jest.mock('../../api/firebase', () => ({
  ref: jest.fn(),
  child: jest.fn((_, path) => {
    return path
  }),
  get: jest.fn((path) => {
    if (path === 'hangman/rooms') {
      // Simula um snapshot com os dados que você deseja
      const snapshot = {
        exists: () => true,
        val: () => data
      };
      // Retorna uma promessa que resolve com o snapshot simulado
      return Promise.resolve(snapshot);
    } else if (path === 'hangman/rooms/ABCDEF') {
      // Simula um snapshot com os dados que você deseja
      const snapshot = {
        exists: () => true,
        val: () => data
      };
      return Promise.resolve(snapshot);
    } else {
      return Promise.resolve(null);
    }
  }),
  set: jest.fn(() => Promise.resolve()),
  push: jest.fn(() => ({
    key: 'newKey' // Simula a criação de uma nova referência com uma chave simulada
  })),
  update: jest.fn(),
  onDisconnect: jest.fn(() => ({
    remove: jest.fn()
  })),
  remove: jest.fn(),
  database: jest.fn(),
  onValue: jest.fn((ref, callback) => {
    // Simular chamada do callback com um valor falso
    callback({ val: () => false });
  }),
}));

describe('Home component', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Home 
        lang={lang.home} 
        changeComponent={jest.fn()}
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates state when inputs change', () => {
    const { getByTestId } = render(
      <Home 
        lang={lang.home} 
        changeComponent={jest.fn()}
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    );

    const nameInput = getByTestId('name_id') as HTMLInputElement;
    const codeInput = getByTestId('code_id') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Theu" } });
    fireEvent.change(codeInput, { target: { value: "ABCYUO" } });

    const radioOption1 = getByTestId('checked_id_1');
    const radioOption2 = getByTestId('checked_id_2');

    // Verifique se o valor inicial do input de rádio é 'option1'
    expect(radioOption1).toHaveProperty('checked', true);
    expect(radioOption2).toHaveProperty('checked', false);

    // Simule o clique no segundo input de rádio
    fireEvent.click(radioOption2);

    // Verifique se o valor do input de rádio mudou para 'option2'
    expect(radioOption1).toHaveProperty('checked', false);
    expect(radioOption2).toHaveProperty('checked', true);

    expect(nameInput.value).toBe("Theu");
    expect(codeInput.value).toBe("ABCYUO");
  });

  it('should transition to offline mode when "Play Offline" button is pressed', async () => {
    // Mock da função changeComponent
    const mockChangeComponent = jest.fn();

    // Renderiza o componente Home com a função changeComponent mockada
    const { getByText } = render(
      <Home 
        lang={lang.home} 
        changeComponent={mockChangeComponent} // Passa o mock como prop
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    );

    // Encontra o botão pelo texto "JOGAR OFFLINE"
    const jogarOfflineButton = getByText('JOGAR OFFLINE');

    // Simula um clique no botão "JOGAR OFFLINE"
    fireEvent.click(jogarOfflineButton);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Game');
    });
  });

  it('should transition to offline mode when "CREATE YOUR ROOM" button is pressed', async () => {
    // Mock da função changeComponent
    const mockChangeComponent = jest.fn();

    // Renderiza o componente Home com a função changeComponent mockada
    const { getByText, getByTestId } = render(
      <Home 
        lang={lang.home} 
        changeComponent={mockChangeComponent} // Passa o mock como prop
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    );

    const nameInput = getByTestId('name_id') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Theu" } });
    expect(nameInput.value).toBe("Theu");

    // Encontra o botão pelo texto "CRIE SUA SALA"
    const play = getByText('CRIE SUA SALA');

    // Simula um clique no botão "CRIE SUA SALA"
    fireEvent.click(play);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Lobby');
    });
  });
  
  it('should transition to offline mode when "Play" button is pressed', async () => {
    // Mock da função changeComponent
    const mockChangeComponent = jest.fn();

    // Renderiza o componente Home com a função changeComponent mockada
    const { getByText, getByTestId } = render(
      <Home 
        lang={lang.home} 
        changeComponent={mockChangeComponent} // Passa o mock como prop
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    );

    const nameInput = getByTestId('name_id') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Theu" } });
    expect(nameInput.value).toBe("Theu");

    // Encontra o botão pelo texto "JOGAR"
    const play = getByText('JOGAR');

    // Simula um clique no botão "JOGAR"
    fireEvent.click(play);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Lobby');
    });
  });

it('should transition to offline mode when "PLAY in CODE" button is pressed', async () => {
    // Mock da função changeComponent
    const mockChangeComponent = jest.fn();

    // Renderiza o componente Home com a função changeComponent mockada
    const { getByText, getByTestId } = render(
      <Home 
        lang={lang.home} 
        changeComponent={mockChangeComponent} // Passa o mock como prop
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    );

    const nameInput = getByTestId('name_id') as HTMLInputElement;
    const codeInput = getByTestId('code_id') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Theu" } });
    fireEvent.change(codeInput, { target: { value: "ABCDEF" } });
    expect(nameInput.value).toBe("Theu");
    expect(codeInput.value).toBe("ABCDEF");

    // Encontra o botão pelo texto "JOGAR"
    const play = getByText('JOGAR');

    // Simula um clique no botão "JOGAR"
    fireEvent.click(play);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Lobby');
    });
  });
});

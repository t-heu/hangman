import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';

import lang from "../dictionaries/pt.json"

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
    const jogarOfflineButton = getByText('JOGAR');

    // Simula um clique no botão "JOGAR"
    fireEvent.click(jogarOfflineButton);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Game');
    });
  });
/*
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
    fireEvent.change(codeInput, { target: { value: "ABCYUO" } });
    expect(nameInput.value).toBe("Theu");
    expect(codeInput.value).toBe("ABCYUO");

    // Encontra o botão pelo texto "JOGAR"
    const jogarOfflineButton = getByText('JOGAR');

    // Simula um clique no botão "JOGAR"
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
    const jogarOfflineButton = getByText('CRIE SUA SALA');

    // Simula um clique no botão "CRIE SUA SALA"
    fireEvent.click(jogarOfflineButton);

    // Aguarda até que a função changeComponent seja chamada com o argumento 'Game'
    await waitFor(() => {
      expect(mockChangeComponent).toHaveBeenCalledWith('Game');
    });
  });*/
});

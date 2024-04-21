import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Home from './page';

import lang from "../dictionaries/pt.json"

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
});
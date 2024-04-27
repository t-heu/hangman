import React from 'react';
import renderer from 'react-test-renderer';
import Game from './page';

import lang from "../dictionaries/pt.json"

describe('Game component', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Game 
        lang={lang.game} 
        changeComponent={jest.fn()}
        code={jest.fn()}
        currentPlayerUID={jest.fn()}
        indexTheme={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
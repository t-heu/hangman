import React from 'react';
import renderer from 'react-test-renderer';
import Lobby from './page';

import lang from "../dictionaries/pt.json"

describe('Lobby component', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Lobby 
        lang={lang.lobby} 
        changeComponent={jest.fn()}
        code={"ABCDEF"}
        currentPlayerUID={"DASDDADADA"}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
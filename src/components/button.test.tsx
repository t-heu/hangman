import React from 'react';
import renderer from 'react-test-renderer';
import Button from './button';

test('matches snapshot', () => {
  const tree = renderer.create(<Button text="SAIR" />).toJSON();
  expect(tree).toMatchSnapshot();
});
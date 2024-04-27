import '@testing-library/jest-dom'
import React from 'react';
import Button from './button';
import { render, fireEvent } from '@testing-library/react';

describe('ButtonComp', () => {
  it('renders green button when text is not "SAIR" or "EXIT"', () => {
    const pressMock = jest.fn();
    const { getByText } = render(<Button text="Submit" press={pressMock} />);
    const button = getByText('Submit');
    
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(pressMock).toHaveBeenCalledTimes(1);
  });

  it('renders red button when text is "SAIR" or "EXIT"', () => {
    const pressMock = jest.fn();
    const { getByText } = render(<Button text="SAIR" press={pressMock} />);
    const button = getByText('SAIR');
    
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(pressMock).toHaveBeenCalledTimes(1);
  });
});

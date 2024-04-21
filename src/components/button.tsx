import React from 'react';

import {ButtonGreen, ButtonRed} from './style'

interface PropsButton {
  text: string;
  press?: any;
}

export default function ButtonComp({text, press}: PropsButton) {
  return (
    <>
      {text != 'SAIR' && text != 'EXIT' ? (
        <ButtonGreen onClick={() => press()}>{text}</ButtonGreen>
      ) : (
        <ButtonRed onClick={() => press()}>{text}</ButtonRed>
      )}
    </>
  )
}

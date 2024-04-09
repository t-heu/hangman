"use client";
import { useState } from 'react';

import Header from '../components/header'
import Game from './game/page'
import Home from './home/page'
import Lobby from './lobby/page'

export default function Page() {
  const [componentToRender, setComponentToRender] = useState('Home');
  const [code, setCode] = useState('');
  const [currentPlayerUID, setCurrentPlayerUID] = useState('');
  const [indexTheme, setIndexTheme] = useState(1);
  
  const changeComponent = (component: any) => {
    setComponentToRender(component);
  };

  return (
    <>
      <Header />
      {componentToRender === 'Lobby' && <Lobby changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} indexTheme={indexTheme} />}
      {componentToRender === 'Game' && <Game changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} indexTheme={indexTheme} />}
      {componentToRender === 'Home' && <Home changeComponent={changeComponent} code={setCode} currentPlayerUID={setCurrentPlayerUID} indexTheme={setIndexTheme} />}
    </>
  );
}


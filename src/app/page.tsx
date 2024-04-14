"use client";
import { useState, useEffect } from 'react';

import Header from '../components/header'
import Game from './game/page'
import Home from './home/page'
import Lobby from './lobby/page'
import { getDictionary } from './dictionaries';

export default function Page() {
  const [componentToRender, setComponentToRender] = useState('');
  const [code, setCode] = useState('');
  const [currentPlayerUID, setCurrentPlayerUID] = useState('');
  const [indexTheme, setIndexTheme] = useState(1);
  const [lang, setLang] = useState<any>({});

  useEffect(() => {
    async function fetchLocale() {
      const language = navigator.language;
      const dict = await getDictionary(language === 'pt-BR' || language === 'pt' || language === 'pt-PT' ? 'pt' : 'en');
      setLang(dict);
      setComponentToRender('Home')
    }
    fetchLocale();
  }, []);
  
  const changeComponent = (component: any) => setComponentToRender(component);

  return (
    <>
      <Header />
      {componentToRender === 'Lobby' && <Lobby lang={lang.lobby} changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} indexTheme={indexTheme} />}
      {componentToRender === 'Game' && <Game lang={lang.game} changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} indexTheme={indexTheme} />}
      {componentToRender === 'Home' && <Home lang={lang.home} changeComponent={changeComponent} code={setCode} currentPlayerUID={setCurrentPlayerUID} indexTheme={setIndexTheme} />}
    </>
  );
}


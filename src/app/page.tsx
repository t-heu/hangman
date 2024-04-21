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
  const [lang, setLang] = useState<any>(null);

  useEffect(() => {
    const language = navigator.language.toLowerCase();
    const supportedLanguages = ['pt-br', 'pt', 'pt-pt', 'en'];
    const defaultLanguage = 'en';
    const selectedLanguage = supportedLanguages.includes(language) ? language : defaultLanguage;
      
    const dict = getDictionary(selectedLanguage);
    setLang(dict);
    setComponentToRender("Home");
  }, []);
  
  const changeComponent = (component: string) => setComponentToRender(component);

  return (
    <>
      <Header />
      {componentToRender === 'Lobby' && <Lobby lang={lang.lobby} changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} />}
      {componentToRender === 'Game' && <Game lang={lang.game} changeComponent={changeComponent} code={code} currentPlayerUID={currentPlayerUID} indexTheme={indexTheme} />}
      {componentToRender === 'Home' && <Home lang={lang.home} changeComponent={changeComponent} code={setCode} currentPlayerUID={setCurrentPlayerUID} indexTheme={setIndexTheme} />}
    </>
  );
}


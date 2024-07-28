"use client";
import React, { useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa6";

import { exitPlayer, monitorConnectionStatus, useLobbyLogic } from 'common';
//import { useGameLogic } from 'common';

import Button from '../../components/button'

import { 
  Title,
  Main
} from '../style'

import { 
  InfoCode,
  PlayerContainer, 
  PlayerName,
  PlayerInfo,
} from './style'

export default function Lobby({lang, changeComponent, code, currentPlayerUID}: any) {
  const navigateGame = () =>  changeComponent('Game');
  const showAlert = (message: any) => alert(message);

  const {
    playReady,
    playerKey,
    players
  } = useLobbyLogic({ navigateGame, showAlert, currentPlayerUID, code });

  useEffect(() => {
    console.info('Monitorando status da conexão', { code, currentPlayerUID });
    monitorConnectionStatus(code, currentPlayerUID)
  }, [code, currentPlayerUID]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert(lang.copied_alert);
    } catch (error) {
      console.error('Erro ao copiar o código da sala para a área de transferência:', error); // Registro de erro com detalhes
    }
  };

  const logout = () => {
    exitPlayer(code, currentPlayerUID)
    changeComponent('Home');
  }

  if (!lang) {
    return null
  }

  const renderThemes = (data: any, index: number) => (
    <PlayerContainer key={index}>
      <PlayerInfo>{data.owner ? '👑 ' : null}</PlayerInfo>
      <PlayerName style={{width: 'auto', paddingRight: 10}}>{data.name}</PlayerName >
      {data.uid === currentPlayerUID ? null : (
        <PlayerInfo style={{color: data.ready ? '#36AA4D' : '#e2584d'}}>{data.ready ? 'READY' : 'NOT READY'}</PlayerInfo>
      )}
    </PlayerContainer>
  )

  return (
    <Main>
      <Title>{lang.waiting_title}</Title>

      {players.map((data: any, i: number) => renderThemes(data, i))}

      {playerKey ? (
        <Button press={playReady} text={!players[playerKey].ready ? 'READY' : 'CANCEL'} />
      ) : null}
      <Button press={logout} text={lang.exit_button} />

      <Main>
        {code ? (
          <>
            <InfoCode style={{color: '#eee'}}>{lang.errors_text}</InfoCode>
            <button onClick={() => copyToClipboard()} style={{display: 'flex', cursor: 'pointer',  background: 'none', border: 'none', flexDirection: 'row', alignItems: 'center'}}>
              <InfoCode style={{color: '#eee'}}>{code}</InfoCode>
              <FaRegCopy fontSize={16} color='#eee' />
            </button>
            <InfoCode style={{color: '#eee'}}>{lang.word_text}</InfoCode>
          </>
        ) : null}
      </Main>
    </Main>
  );
}


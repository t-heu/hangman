"use client";
import { useState, useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa6";

import { database, ref, update, onValue } from '../../api/firebase'

import generateTheme from '../../utils/generateTheme';
import {exitPlayer, monitorConnectionStatus} from '../../utils/monitorConnection';
import getNextPlayer from '../../utils/getNextPlayer';

import Button from '../../components/button'

import { 
  Main, 
  Title,
} from '../style'

import { 
  InfoCode,
  PlayerContainer, 
  PlayerName,
  PlayerInfo,
} from './style'

export default function Lobby({lang, changeComponent, code, currentPlayerUID}: any) {
  const [players, setPlayers] = useState<any>([]);
  const [playerKey, setPlayerKey] = useState<any>('');

  useEffect(() => {
    console.info('Monitorando status da conexão', { code, currentPlayerUID });
    monitorConnectionStatus(code, currentPlayerUID)
  }, [code, currentPlayerUID]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert(lang?.copied_alert);
    } catch (error) {
      console.error('Erro ao copiar o código da sala para a área de transferência:', error); // Registro de erro com detalhes
    }
  };

  function createGame(codeRoom: string, indexTheme: number, playersData?: any) {
    const nextPlayer = 'p' + getNextPlayer(`p${currentPlayerUID}`, playersData).uid;
    const {selectedWord, wordArray} = generateTheme(indexTheme);
    const updates: any = {};
        
    updates['hangman/rooms/' + codeRoom + '/selectedLetters'] = Array('-');
    updates['hangman/rooms/' + codeRoom + '/selectedWord'] = selectedWord;
    updates['hangman/rooms/' + codeRoom + '/wordArray'] = wordArray;
    updates['hangman/rooms/' + codeRoom + '/gameInProgress'] = true;
    updates['hangman/rooms/' + codeRoom + '/turn'] = nextPlayer;
      
    update(ref(database), updates);
  }

  function playReady() {
    update(ref(database), { [`hangman/rooms/${code}/players/p${players[playerKey].uid}/ready`]: players[playerKey].ready ? false : true });
  }

  useEffect(() => {
    const minPlayers = 2;
    const maxPlayers = 8;

    onValue(ref(database, 'hangman/rooms/' + code), (snapshot) => {
      const data = snapshot.val();
      const playersArray: any = Object.values(data.players || {});
      const numPlayers = playersArray.length;
      setPlayers(playersArray);
      setPlayerKey(Object.keys(playersArray).find(key => playersArray[key].uid === currentPlayerUID))

      if (numPlayers >= minPlayers && numPlayers <= maxPlayers) {
        const allPlayersReady = playersArray.every((player: any) => player.ready && !player.gameover && !player.victory);

        if (allPlayersReady && !data.gameInProgress) {
          createGame(code, data.indexTheme, data.players);
          changeComponent('Game');
        }
      }
    });
  }, []);

  const logout = () => {
    exitPlayer(code, currentPlayerUID as number)
    changeComponent('Home');
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
      <Title>{lang?.waiting_title}</Title>

      {players.map((data: any, i: number) => renderThemes(data, i))}

      {playerKey ? (
        <Button press={playReady} text={!players[playerKey].ready ? 'READY' : 'CANCEL'} />
      ) : null}
      <Button press={logout} text={lang?.exit_button} />

      <Main>
        {code ? (
          <>
            <InfoCode style={{color: '#eee'}}>{lang?.errors_text}</InfoCode>
            <button onClick={() => copyToClipboard()} style={{display: 'flex', cursor: 'pointer',  background: 'none', border: 'none', flexDirection: 'row', alignItems: 'center'}}>
              <InfoCode style={{color: '#eee'}}>{code}</InfoCode>
              <FaRegCopy fontSize={16} color='#eee' />
            </button>
            <InfoCode style={{color: '#eee'}}>{lang?.word_text}</InfoCode>
          </>
        ) : null}
      </Main>
    </Main>
  );
}


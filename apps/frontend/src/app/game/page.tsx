"use client";
import React, { useCallback } from 'react';

import { 
  exitPlayer, 
  useGameLogic
} from 'common'

import {
  Main,
} from '../style';

import {
  InfoHeader,
  GuideText,
  LetterContainer,
  TimeText
} from './style';

import Button from '../../components/button';
import Letter from '../../components/letter';

export default function Game({lang, changeComponent, code, currentPlayerUID, indexTheme}: any) {
  const navigateLobby = () => {
    changeComponent('Lobby')
  };

  const showAlert = (message: any) => alert(message);

  const {
    statusGame, gameState, timeRemaining, countErrors, existLetter, restartGame, turn, winnerMessage, players, handleSelectLetter
  } = useGameLogic({ lang, showAlert, currentPlayerUID, code, indexTheme, navigateLobby });

  const logout = useCallback(() => {
    if (code) exitPlayer(code, currentPlayerUID)
    changeComponent('Home')
  }, [code, currentPlayerUID, changeComponent]);

  if (!lang) {
    return null
  }

  return (
    <Main>
      <InfoHeader>
        <GuideText style={{color: '#e2584d'}}>{lang.errors_text}: {countErrors}</GuideText>
        <TimeText>
          {timeRemaining < 10 ? `00:0${timeRemaining}` : `00:${timeRemaining}`}
        </TimeText>
        <GuideText style={{color: '#FDE767'}}>{existLetter}</GuideText>
      </InfoHeader>

      <LetterContainer>
        {gameState.wordArray.map((item: string, index: number) => <Letter key={index} item={item} handleSelectLetter={() => {}} />)}
      </LetterContainer>

      <GuideText>{gameState.selectedWord.dica ? `${lang.tip_text}: ${gameState.selectedWord.dica}` : null}</GuideText>
      
      {statusGame === 'play' ? (
        <LetterContainer>
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((item, index) => <Letter key={index} item={item} handleSelectLetter={handleSelectLetter} />)}
        </LetterContainer>
      ) : statusGame === 'gameover' ? (
        <>
          <GuideText style={{color: '#FDE767'}}>{winnerMessage}</GuideText>
          {!code || (!(gameState.wordArray.every((char: string) => char !== '')) && Object.values(players).length > 1) ? (<GuideText style={{color: '#FDE767'}}>{lang.word_text} {gameState.selectedWord.name}</GuideText>) : null}
          <Button press={restartGame} text={lang.play_again_button} />
          <Button press={logout} text={lang.exit_button} />
        </>
      ) : (
        <GuideText style={{color: '#FDE767'}}>{lang.waiting_to_play_text_part_1} {turn} {lang.waiting_to_play_text_part_2}</GuideText>
      )}
    </Main>
  );
}

"use client";
import React, { useState, useEffect } from 'react';

import { database, ref, update, onValue } from '../../api/firebase'

import {
  Main,
} from '../style';

import {
  InfoHeader,
  GuideText,
  LetterContainer,
  CharacterDisplay,
  LetterText
} from './style';

import Button from '../../components/button';

import generateTheme from '../../utils/generateTheme';
import {exitPlayer, monitorConnectionStatus} from '../../utils/monitorConnection';
import getNextPlayer from '../../utils/getNextPlayer';

interface Theme {
  name: string;
  dica: string;
}

export default function Game({lang, changeComponent, code, currentPlayerUID, indexTheme}: any) {
  const [word, setWord] = useState<Theme>({name: '', dica: ''});
  const [wordName, setWordName] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [countErrors, setCountErrors] = useState(0);
  const [existLetter, setExistLetter] = useState('');
  const [existElement, setExistElement] = useState(false);
  const [status, setStatus] = useState('');
  const [players, setPlayers] = useState<any>({});
  const [winnerMessage, setWinnerMessage] = useState('');
  const [turn, setTurn] = useState('');

  useEffect(() => {
    if (code) {
      const roomRef = ref(database, 'hangman/rooms/' + code);
      onValue(roomRef, handleRoomData);
      monitorConnectionStatus(code, currentPlayerUID)
    } else {
      initializeGame();
    }
  }, []);

  function handleRoomData(snapshot: any) {
    const data = snapshot.val();
    if (!data) return;

    const playersArray = Object.values(data.players || {});

    if (data.gameInProgress) {
      updateGameState(data, playersArray);
    }
  }

  function updateGameState(data: any, playersArray: any[]) {
    const allPlayersReady = playersArray.every((player: any) => player.active && !player.gameover && !player.victory);
    const anyPlayerGameOverOrVictory = playersArray.some((player: any) => player.gameover || player.victory);

    if (allPlayersReady) {
      updateGameInProgressState(data);
    }

    if (data.players[data.turn]) {
      if (playersArray.length <= 1) {
        handleGameEnd(lang?.game_status_text, data);
      } else {
        setTurn(data.players[data.turn].name);
      }
    } else {
      const nextPlayer = getNextPlayer(data.turn, data.players);
      
      if (nextPlayer) {
        const nextPlayerKey = 'p' + nextPlayer.uid;
        update(ref(database), { [`hangman/rooms/${code}/turn`]: nextPlayerKey });
      }
    }

    if (anyPlayerGameOverOrVictory) {
      handleGameEnd(lang?.game_over_text, data);
    }
  }

  function updateGameInProgressState(data: any) {
    setWordName(data.wordArray);
    setSelectedLetters(data.selectedLetters);
    setExistElement(`p${currentPlayerUID}` === data.turn);
    setWord(data.selectedWord);
    setPlayers(data.players);
  }

  const handleSelectLetter = (letter: string) => {
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
  
      const newWordName = word.name.split('').map((char, index) => char === letter ? char : wordName[index]);

      const isNotEmpty = newWordName.every((char) => char !== '');
      if (isNotEmpty) {
        handleVictory();
      }

      if (newWordName.indexOf(letter) === -1) {
        handleIncorrectGuess();
      }

      if (code) {
        updateRoomState(letter, newWordName);
      }  

      setWordName(newWordName);
    } else {
      setExistLetter(`${lang?.letter_already_used_text} ${letter}`)
    }
  };

  function updateRoomState(letter: string, newWordName: string[]) {
    const updates: any = {};
    updates['hangman/rooms/' + code + '/selectedLetters'] = [...selectedLetters, letter];
    updates['hangman/rooms/' + code + '/wordArray'] = newWordName;

    const nextPlayer = 'p' + getNextPlayer(`p${currentPlayerUID}`, players).uid;
    updates['hangman/rooms/' + code + '/turn'] = nextPlayer;
    update(ref(database), updates);
  }

  const handleGameEnd = (text: string, data: any) => {
    setExistElement(false);
    setStatus('gameover');

    const winnerMessage: any = Object.values(data.players).find((player: any) => player.victory);

    if (winnerMessage) {
      setWinnerMessage(`${winnerMessage.name} ${lang?.winner_text}`);
    } else {
      setWinnerMessage(text);
    }

    update(ref(database), { [`hangman/rooms/${code}/gameInProgress`]: false });
  };

  const handleVictory = () => {
    setExistElement(false);
    setStatus('gameover');
    setWinnerMessage(lang?.winner_solo_text);

    if (code) {
      const updates: any = {};
      Object.keys(players).forEach(key => {
        if (key === `p${currentPlayerUID}`) {
          updates[`hangman/rooms/${code}/players/${key}/victory`] = true;
        } else {
          updates[`hangman/rooms/${code}/players/${key}/gameover`] = true;
        }
      });
      
      update(ref(database), updates);
    }  
  };

  const handleIncorrectGuess = () => {
    setCountErrors(countErrors + 1);
    
    if (countErrors === 5) {
      setExistElement(false);
      setStatus('gameover');
      setWinnerMessage(lang?.game_over_solo_text);
      
      if (code) {
        const updates: any = {};

        Object.keys(players).forEach(key => {
          updates[`hangman/rooms/${code}/players/${key}/gameover`] = true;
        });
        update(ref(database), updates);
      } 
    }
  };

  function restartGame() {
    if (code) {
      const playerKey = 'p' + currentPlayerUID;
      
      if (playerKey) {
        const updates: any = {};
        updates[`hangman/rooms/${code}/players/${playerKey}/gameover`] = false;
        updates[`hangman/rooms/${code}/players/${playerKey}/victory`] = false;
        updates[`hangman/rooms/${code}/players/${playerKey}/ready`] = false;
        update(ref(database), updates);
      }

      changeComponent('Lobby')
    } else {
      initializeGame();
    }
  }

  function initializeGame() {
    const { selectedWord, wordArray } = generateTheme(indexTheme === undefined ? 4 : indexTheme);

    setExistElement(true);
    setWord(selectedWord);
    setWordName(wordArray);
    setSelectedLetters([]);
    setCountErrors(0);
    setExistLetter('');
    setStatus('');
  }

  const logout = () => {
    if (code) exitPlayer(code, currentPlayerUID)
    changeComponent('Home')
  }

  const RenderItemLetters = ({ item, index, aa }: any) => {
    return (
      <CharacterDisplay
        key={index}
        onClick={aa ? () => handleSelectLetter(item) : () => {}}>
        <LetterText>{item}</LetterText>
      </CharacterDisplay>
    )
  }

  return (
    <Main>
      <InfoHeader>
        <GuideText style={{color: '#e2584d'}}>{lang?.errors_text}: {countErrors}</GuideText>
        <GuideText style={{color: '#FDE767'}}>{existLetter}</GuideText>
      </InfoHeader>

      <LetterContainer>
        {wordName.map((item, index) => <RenderItemLetters key={index} item={item} aa={false} />)}
      </LetterContainer>

      <GuideText>{word.dica ? `${lang?.tip_text}: ${word.dica}` : null}</GuideText>

      {existElement ? (
        <LetterContainer>
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((item, index) => <RenderItemLetters key={index} item={item} aa={true} />)}
        </LetterContainer>
      ) : (
        <>
          {status ? (
            <>
              <GuideText style={{color: '#FDE767'}}>{winnerMessage}</GuideText>
              {!code || (!(wordName.every((char) => char !== '')) && Object.values(players).length > 1) ? (<GuideText style={{color: '#FDE767'}}>{lang?.word_text} {word.name}</GuideText>) : null}
              <Button press={restartGame} text={lang?.play_again_button} />
              <Button press={logout} text={lang?.exit_button} />
            </>
          ) : (
            <GuideText style={{color: '#FDE767'}}>{lang?.waiting_to_play_text_part_1} {turn} {lang?.waiting_to_play_text_part_2}</GuideText>
          )}
        </>
      )}
    </Main>
  );
}

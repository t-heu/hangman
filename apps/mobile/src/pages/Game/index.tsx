import React, { useEffect, useCallback } from 'react';
import { ScrollView, Alert, BackHandler } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { type StackNavigation } from "../../../App";

import { 
  exitPlayer
} from 'common'
import { useGameLogic } from 'common/src/gameLogic';

import {
  Main,
} from '../style';

import {
  InfoHeader,
  GuideText,
  LetterContainer,
  TimeContainer,
  TimeText
} from './style';

import Header from '../../components/header';
import Button from '../../components/button';
import Letter from '../../components/letter';

type ParamList = {
  Detail: {
    code: string;
    currentPlayerUID?: string;
    indexTheme?: number;
  };
};

export default function Game() {
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const navigation = useNavigation<StackNavigation>();
  const {code, currentPlayerUID, indexTheme} = route.params;
  const navigateLobby = () => {
    navigation.navigate("Lobby",  { code, currentPlayerUID })
  };
  
  const {
    statusGame, gameState, timeRemaining, countErrors, existLetter, restartGame, turn, winnerMessage, players, handleSelectLetter
  } = useGameLogic({ currentPlayerUID, code, indexTheme, navigateLobby });

  function handleBackButtonClick() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair da partida, vai perder sua posição!',
      [
        { text: "Cancelar", style: 'cancel', onPress: () => {} },
        { text: 'Sair', style: 'destructive', onPress: () => logout() },
      ]
    );
    return true;
  }

  const logout = useCallback(() => {
    if (code) exitPlayer(code, currentPlayerUID as string)
    navigation.navigate('Home')
  }, [code, currentPlayerUID]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  }, [code, currentPlayerUID]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#262632'}}>
    <Main>
      <Header />

      <InfoHeader>
        <GuideText style={{color: '#e2584d', width: 140}}>Errors: {countErrors}</GuideText>
        <TimeContainer>
          <TimeText>
            {timeRemaining < 10 ? `00:0${timeRemaining}` : `00:${timeRemaining}`}
          </TimeText>
        </TimeContainer>
        <GuideText style={{width: 140}}>{existLetter}</GuideText>
      </InfoHeader>

      <LetterContainer>
        {gameState.wordArray.map((item, index) => <Letter key={index} item={item} handleSelectLetter={() => {}}/>)}
      </LetterContainer>

      <GuideText style={{color: '#eee'}}>{gameState.selectedWord.dica ? `Dica: ${gameState.selectedWord.dica}` : null}</GuideText>

      {statusGame === 'play' ? (
        <LetterContainer>
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((item, index) => <Letter key={index} item={item} handleSelectLetter={handleSelectLetter} />)}
        </LetterContainer>
      ) : statusGame === 'gameover' ? (
        <>
          <GuideText>{winnerMessage}</GuideText>
          {!code ||  (!(gameState.wordArray.every((char) => char !== ''))) && Object.values(players).length > 1 ? (<GuideText>A Palavra era: {gameState.selectedWord.name}</GuideText>) : null}
          <Button press={restartGame} text='JOGAR NOVAMENTE' />
          <Button press={logout} text='SAIR' />
        </>
      ) : (
        <GuideText>AGUARDANDO {turn} JOGAR...</GuideText>
      )}
    </Main>
    </ScrollView>
  );
}

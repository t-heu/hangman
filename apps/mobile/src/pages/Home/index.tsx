import { Alert, ScrollView } from 'react-native';
import {  useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useNetInfo, refresh } from "@react-native-community/netinfo";

import {getThemes} from "common";
import { useGameLogic } from 'common/src/homeLogic';
import { type StackNavigation } from "../../../App";

import Header from '../../components/header'
import Button from '../../components/button'

import { 
  Main, 
  Title,
} from '../style'

import { 
  RoomDiv, 
  Input, 
  ThemeOptionText,
  OnlineRoomDiv,
  ThemeOptionContainer
} from './style'

export default function Home() {
  const {navigate} = useNavigation<StackNavigation>();
  const { isConnected } = useNetInfo();
  const navigateLobby = (params: any) => {
    navigate("Lobby",  { code: params.roomKey, currentPlayerUID: params.nextPlayer as string });
  };

  const navigateGame = (params: any) => {
    navigate("Game",  { code: params.codeRoom, indexTheme: params.checked })
  };

  const showAlert = (message: any) => Alert.alert(message);

  const {
    checked,
    setChecked,
    name,
    setName,
    codeRoom,
    setCodeRoom,
    themes,
    createGame,
    setThemes,
    play
  } = useGameLogic({ lang, navigateLobby, navigateGame, showAlert });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes(isConnected as boolean);
        setThemes(data.themes);
      } catch (e) {
        console.log(e)
      }
    };

    if (isConnected === null) {
      console.log('refreshing...')
      refresh();
    } else {
      fetchThemes();
    }
  }, [isConnected]);

  const onLayoutRootView = () => setTimeout(async () => await SplashScreen.hideAsync(), 1200);

  const renderThemes = (item: any, index: any) => (
    <ThemeOptionContainer key={index}>
      <RadioButton
        value={index}
        color='#eee'
        status={ checked === index ? 'checked' : 'unchecked' }
        onPress={() => setChecked(index)}
      />
      <ThemeOptionText>{item[index].name}</ThemeOptionText>
    </ThemeOptionContainer>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#262632'}}>
      <Header />
      <Main onLayout={onLayoutRootView}>
        <Title>Escolha seu tema favorito:</Title>

        <ScrollView style={{height: 220}}>
          {themes.length > 0 ? themes.map((data, i) => renderThemes(data, i)) : <Title>....</Title>}
        </ScrollView>

        <Button text='JOGAR OFFLINE' press={() => createGame(false)} />

        <Main>
          <Title>JOGUE COM SEU COLEGA:</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input placeholderTextColor="#888" value={name} onChangeText={(text) => setName(text)} placeholder='Seu nome' />
              <Input placeholderTextColor="#888" value={codeRoom} onChangeText={(text) => setCodeRoom(text)} placeholder='Código' />
              <Button text='JOGAR' press={() => play()} />
            </RoomDiv>

            <Title>OU:</Title>

            <Button text='CRIE SUA SALA' press={() => createGame(true)} />
          </OnlineRoomDiv>
        </Main>
      </Main>
    </ScrollView>
  );
}


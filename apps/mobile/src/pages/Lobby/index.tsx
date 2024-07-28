import { FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { type StackNavigation } from "../../../App";
import { exitPlayer } from 'common'
import { useGameLogic } from 'common/src/lobbyLogic';

import Header from '../../components/header'
import Button from '../../components/button'

import { 
  Main, 
  Title,
} from '../style'

import { 
  PlayerContainer, 
  PlayerName,
  PlayerInfo,
  InfoCode
} from './style'

type ParamList = {
  Detail: {
    selectedWord: any;
    wordArray: any;
    code: string;
    currentPlayerUID: string;
    indexTheme: number;
  };
};

export default function Lobby() {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const {code, currentPlayerUID} = route.params

  const navigateGame = (params: any) => {
    navigation.navigate("Game", { code, currentPlayerUID });
  };

  const copyToClipboard = async () => await Clipboard.setStringAsync(code);
  const showAlert = (message: any) => Alert.alert(message);

  const {
    playReady,
    playerKey,
    players
  } = useGameLogic({ navigateGame, showAlert, currentPlayerUID, code });

  const logout = () => {
    exitPlayer(code, currentPlayerUID as string)
    navigation.navigate('Home')
  }

  const renderThemes = (data: any, index: any) => (
    <PlayerContainer>
      <PlayerInfo>{data.owner ? '👑 ' : null}</PlayerInfo>
      <PlayerName style={{width: 'auto', paddingRight: 10}}>{data.name}</PlayerName >
      {data.uid === currentPlayerUID ? null : (
        <PlayerInfo style={{color: data.ready ? '#36AA4D' : '#e2584d'}}>{data.ready ? 'READY' : 'NOT READY'}</PlayerInfo>
      )}
    </PlayerContainer>
  );

  return (
    <Main>
      <Header />

      <Title style={{textAlign: 'center'}}>Aguardando mais jogadores entrar:</Title>

      <FlatList
        data={players}
        renderItem={({ item, index }) => renderThemes(item, index)}
        keyExtractor={(_, index) => index.toString()}
        style={{marginBottom: 15, height: 200}}
        numColumns={2}
      />

      {playerKey ? (
        <Button press={playReady} text={!players[playerKey].ready ? 'READY' : 'CANCEL'} />
      ) : null}
      <Button press={logout} text='SAIR' />

      <Main>
        {code ? (
          <>
            <InfoCode>Clique para copiar código</InfoCode>
            <TouchableOpacity onPress={() => copyToClipboard()} style={{flexDirection: 'row'}}>
              <InfoCode>{code}</InfoCode>
              <Feather name="copy" size={24} color="#eee" />
            </TouchableOpacity>
            <InfoCode>Compartilhe código com seu colega</InfoCode>
          </>
        ) : null}
      </Main>
    </Main>
  );
}


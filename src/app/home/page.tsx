"use client";
import { useState } from 'react';

import { database, set, ref, update, get, child, remove, push } from '../../api/firebase'
import DataTheme from '../../data/themes.json';

import Button from '../../components/button'

import { 
  RoomDiv, 
  Input, 
  Main, 
  Title,
  OnlineRoomDiv,
  Theme,
  Container,
  ContainerT,
  Checkmark,
  InputT
} from './style'

export default function Home({lang, changeComponent, code, currentPlayerUID, indexTheme}: any) {
  const [checked, setChecked] = useState(1);
  const [name, setName] = useState('');
  const [codeRoom, setCodeRoom] = useState('');

  function generateRandomWord(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomWord = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomWord += characters.charAt(randomIndex);
    }
    return randomWord;
  }

  async function deleteRoom(roomCode: string) {
    try {
      await remove(ref(database, `hangman/rooms/${roomCode}`));
      console.log(`Nó 'hangman/rooms/${roomCode}' excluído com sucesso.`);
    } catch (error: any) {
      console.error('Erro ao excluir o nó:', error.message);
    }
  }

  function createPlayer(roomKey: string, owner: boolean, name: string) {
    try {
      const updates: any = {};
      const playersRef = ref(database, `hangman/rooms/${roomKey}/players`);
      const newPlayerRef = push(playersRef);
      const nextPlayer = newPlayerRef.key;
  
      updates[`hangman/rooms/${roomKey}/players/p${nextPlayer}`] = {
        name,
        gameover: false,
        victory: false,
        uid: nextPlayer,
        active: true,
        ready: false,
        owner,
      }
      
      update(ref(database), updates);
      code(roomKey)
      indexTheme(checked)
      currentPlayerUID(nextPlayer)
      changeComponent('Lobby')
    } catch (error) {
      console.error('Erro ao criar jogador:', error);
    }
  }

  async function createGame(stauts: boolean) {
    try {
      if (stauts) {
        if (!name) {
          return alert(lang.alert_1);
        }

        if (!(/^[a-zA-Z\s]*$/.test(name))) {
          return alert(lang.alert_2)
        }

        const roomKey = generateRandomWord(6);

        await set(ref(database, 'hangman/rooms/' + roomKey), {
          turn: 'p1',
          indexTheme: checked,
          gameInProgress: false,
          selectedLetters: Array('-'),
          wordArray: Array('-'),
          selectedWord: {name: '', dica: ''}
        });

        code(roomKey)
        createPlayer(roomKey, true, name);
      } else {
        indexTheme(checked)
        changeComponent('Game')
      }
    } catch (e) {
      console.log(e)
    }
  }

  function enterRoomCode() {
    get(child(ref(database), 'hangman/rooms/' + codeRoom)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const playersObject = data.players || {};
        const numPlayers = Object.keys(playersObject).length;

        if (!data.gameInProgress && numPlayers < 8) {
          createPlayer(codeRoom, false, name)
        } else {
          alert(lang.alert_3)
        }
      } else {
        alert(lang.alert_4)
      }
    }).catch((error) => {
      console.error(error);
      alert(lang.alert_5)
    });
  }

  function joinRoom() {
    get(child(ref(database), 'hangman/rooms')).then((snapshot) => {
      if (snapshot.exists()) {
        const rooms = snapshot.val();
        
        Object.keys(rooms).some((roomKey) => {
          const room = rooms[roomKey];
          const playersObject = room.players || {};
          const numPlayers = Object.keys(playersObject).length;

          if (numPlayers === 0) {
            deleteRoom(roomKey);
            createGame(true);
          } else {
            if (!room.gameInProgress && numPlayers < 8) {
              createPlayer(roomKey, false, name)
              return true
            } else {
              createGame(true);
              return true
            }
          }
        });
      } else {
        createGame(true);
      }
    }).catch((error) => {
      console.error(error);
      alert(lang.alert_5);
    });
  }

  function play() {
    if (!name) {
      return alert(lang.alert_1);
    }

    if (!(/^[a-zA-Z\s]*$/.test(name))) {
      return alert(lang.alert_2)
    }

    if (!(/^[a-zA-Z\s]*$/.test(codeRoom))) {
      return alert(lang.alert_4)
    }

    if (codeRoom) {
      enterRoomCode();
    } else {
      joinRoom();
    }
  }

  const renderThemes = (item: any, index: any) => (
    <ContainerT key={index}>{item.name}
      <InputT type="radio" value={index} checked={checked === index} onChange={() => setChecked(index)} />
      <Checkmark className="checkmark" />
    </ContainerT>
  );

  return (
    <Main>
      <Container>
        <Main>
          <Title>{lang.title_1}</Title>

          <Theme>
            {DataTheme.themes.map((data, i) => (
              renderThemes(data, i)
            ))}
          </Theme>

          <Button text={lang.button_1} press={() => createGame(false)} />
        </Main>

        <Main>
          <Title>{lang.title_2}</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.input_1} />
              <Input value={codeRoom} onChange={(e) => setCodeRoom(e.target.value)} placeholder={lang.input_2} />
              <Button text={lang.button_2} press={() => play()} />
              <Title>{lang.title_3}</Title>
              <Button text={lang.button_3} press={() => createGame(true)} />
            </RoomDiv>
          </OnlineRoomDiv>
        </Main>
      </Container>
    </Main>
  );
}


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

export default function Home({changeComponent, code, currentPlayerUID, indexTheme}: any) {
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
          return alert('Error: Insira seu nome');
        }

        if (!(/^[a-zA-Z\s]*$/.test(name))) {
          return alert('Insira nome valido!')
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
          alert('Error: Ja foi iniciado a partida ou sala cheia')
        }
      } else {
        alert('Error: Código inválido')
      }
    }).catch((error) => {
      console.error(error);
      alert('Error: Tente novamente')
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
      alert('Error: Tente novamente');
    });
  }

  function play() {
    if (!name) {
      return alert('Error: Insira seu nome!');
    }

    if (!(/^[a-zA-Z\s]*$/.test(name))) {
      return alert('Insira nome valido!')
    }

    if (!(/^[a-zA-Z\s]*$/.test(codeRoom))) {
      return alert('Insira código valido!')
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
          <Title>Escolha seu tema favorito:</Title>

          <Theme>
            {DataTheme.themes.map((data, i) => (
              renderThemes(data, i)
            ))}
          </Theme>

          <Button text='JOGAR OFFLINE' press={() => createGame(false)} />
        </Main>

        <Main>
          <Title>JOGUE COM SEU COLEGA:</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Seu nome' />
              <Input value={codeRoom} onChange={(e) => setCodeRoom(e.target.value)} placeholder='Código' />
              <Button text='JOGAR' press={() => play()} />
              <Title>OU</Title>
              <Button text='CRIE SUA SALA' press={() => createGame(true)} />
            </RoomDiv>
          </OnlineRoomDiv>
        </Main>
      </Container>
    </Main>
  );
}


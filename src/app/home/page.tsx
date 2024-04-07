"use client";
import { useState } from 'react';
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

import { database, set, ref, update, get, child, remove, push } from '../../api/firebase'
import DataTheme from '../../data/themes.json';

import Button from '../../components/button'

import { 
  RoomDiv, 
  Input, 
  Main, 
  Title,
  OnlineRoomDiv
} from './style'

export default function Home({changeComponent, code, currentPlayerUID, indexTheme}: any) {
  const [checked, setChecked] = useState(1);
  const [nameP1, setNameP1] = useState('');
  const [nameP2, setNameP2] = useState('');
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

  function createPlayer(roomKey: string, owner: boolean) {
    try {
      const updates: any = {};
      const playersRef = ref(database, `hangman/rooms/${roomKey}/players`);
      const newPlayerRef = push(playersRef);
      const nextPlayer = newPlayerRef.key;
  
      updates[`hangman/rooms/${roomKey}/players/p${nextPlayer}`] = {
        name: nameP1 || nameP2,
        gameover: false,
        victory: false,
        uid: nextPlayer,
        active: true,
        ready: false,
        owner,
      }
      
      update(ref(database), updates);
      
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
        if (!nameP1) {
          return alert('Error: Insira seu nome');
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
        createPlayer(roomKey, true);
      } else {
        //router.push(`/game?indexTheme=${checked}`);
        indexTheme(checked)
        changeComponent('Game')
      }
    } catch (e) {
      console.log(e)
    }
  }

  function enterRoomCode() {
    get(child(ref(database), 'hangman/rooms/' + code)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const playersObject = data.players || {};
        const numPlayers = Object.keys(playersObject).length;

        if (!data.gameInProgress && numPlayers < 8) {
          createPlayer(code, false)
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
              createPlayer(roomKey, false)
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
    if (code) {
      if (!nameP2) {
        return alert('Error: Insira seu nome');
      }
      enterRoomCode();
    } else {
      // Buscar todas as salas no banco de dados
      joinRoom();
    }
  }

  const renderThemes = (item: any, index: any) => (
    <div key={index}>
      <label className='container' htmlFor={`theme-${index}`}>{item.name}
      <input
        type="radio"
        className='theme'
        id={`theme-${index}`}
        value={index}
        checked={checked === index}
        onChange={() => setChecked(index)}
      />
      <span className="checkmark"></span>
      </label>
    </div>
  );

  return (
      <Main>
        <Title className={`${sourceCodePro.className}`}>Escolha seu tema favorito:</Title>

        {DataTheme.themes.map((data, i) => (
          renderThemes(data, i)
        ))}

        <Button text='JOGAR OFFLINE' press={() => createGame(false)} />

        <Main>
          <Title>JOGUE COM SEU COLEGA:</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input value={nameP1} onChange={(e) => setNameP1(e.target.value)} placeholder='Seu nome' />
              <Button text='CRIAR SALA' press={() => createGame(true)} />
            </RoomDiv>

            <RoomDiv>
              <Input value={nameP2} onChange={(e) => setNameP2(e.target.value)} placeholder='Seu nome' />
              <Input value={codeRoom} onChange={(e) => setCodeRoom(e.target.value)} placeholder='Code' />
              <Button text='JOGAR' press={() => play()} />
            </RoomDiv>
          </OnlineRoomDiv>
        </Main>
      </Main>
  );
}


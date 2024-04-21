"use client";
import React, {useState} from 'react';

import { database, set, ref, update, get, child, push } from '../../api/firebase'
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
import {IHome} from "../../interfaces";

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

      if (nextPlayer) {
        update(ref(database), updates);
        code(roomKey)
        indexTheme(checked)
        currentPlayerUID(nextPlayer)
        changeComponent('Lobby')
      }
    } catch (error) {
      console.error('Erro ao criar jogador:', error);
    }
  }

  async function createGame(stauts: boolean) {
    try {
      if (stauts) {
        if (!name) {
          console.error('Erro ao criar jogo: Nome do jogador não fornecido');
          return alert(lang.copied_alert);
        }

        if (!(/^[a-zA-Z\s]*$/.test(name))) {
          console.error('Erro ao criar jogo: Nome do jogador inválido');
          return alert(lang.invalid_copied_alert)
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

        console.info('Jogo criado com sucesso', { roomKey, playerName: name });
        code(roomKey)
        createPlayer(roomKey, true, name);
      } else {
        indexTheme(checked)
        changeComponent('Game')
      }
    } catch (e) {
      console.error('Erro ao criar jogo:', e);
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
          console.warn(`Tentativa de entrada na sala ${codeRoom} falhou: sala cheia ou partida em andamento`);
          alert(lang.game_started_error_alert)
        }
      } else {
        console.warn(`Tentativa de entrada na sala ${codeRoom} falhou: sala inexistente`);
        alert(lang.invalid_code_error_alert)
      }
    }).catch((error) => {
      console.error(`Erro ao verificar a sala ${codeRoom}: ${error.message}`);
      alert(lang.try_again_error_alert)
    });
  }

  function joinRoom() {
    get(child(ref(database), 'hangman/rooms')).then((snapshot) => {
      if (snapshot.exists()) {
        const rooms = snapshot.val();
        let foundRoom = false;
        
        Object.keys(rooms).some((roomKey) => {
          const room = rooms[roomKey];
          const playersObject = room.players || {};
          const numPlayers = Object.keys(playersObject).length;
  
          if (!room.gameInProgress && numPlayers < 8) {
            createPlayer(roomKey, false, name);
            foundRoom = true;
            return true;
          }
        });
  
        if (!foundRoom) {
          createGame(true);
        }
      } else {
        createGame(true);
        return true;
      }
    }).catch((error) => {
      console.error(`Erro ao verificar as salas: ${error.message}`);
      alert(lang.try_again_error_alert);
    });
  }

  function play() {
    if (!name) {
      return alert(lang.copied_alert);
    }

    if (!(/^[a-zA-Z\s]*$/.test(name))) {
      return alert(lang.invalid_copied_alert)
    }

    if (!(/^[a-zA-Z\s]*$/.test(codeRoom))) {
      return alert(lang.invalid_code_error_alert)
    }

    if (codeRoom) {
      enterRoomCode();
    } else {
      joinRoom();
    }
  }

  if (!lang) {
    return null
  }

  const renderThemes = (item: any, index: any) => (
    <ContainerT key={index}>{item.name}
      <InputT data-testid={'checked_id_'+index} type="radio" value={index} checked={checked === index} onChange={() => setChecked(index)} />
      <Checkmark className="checkmark" />
    </ContainerT>
  );

  return (
    <Main>
      <Container>
        <Main>
          <Title>{lang && lang.waiting_title}</Title>

          <Theme>
            {DataTheme.themes.map((data, i) => (
              renderThemes(data, i)
            ))}
          </Theme>

          <Button text={lang.exit_button} press={() => createGame(false)} />
        </Main>

        <Main>
          <Title>{lang.play_with_friends_title}</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input data-testid="name_id" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.your_name_input} />
              <Input data-testid="code_id" value={codeRoom} onChange={(e) => setCodeRoom(e.target.value)} placeholder={lang.code_input} />
              <Button text={lang.play_again_button} press={() => play()} />
              <Title>{lang.or_title}</Title>
              <Button text={lang.create_room_button} press={() => createGame(true)} />
            </RoomDiv>
          </OnlineRoomDiv>
        </Main>
      </Container>
    </Main>
  );
}


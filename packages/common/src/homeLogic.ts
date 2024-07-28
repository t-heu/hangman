import { useState } from 'react';
import { generateRandomWord, database, set, ref, update, get, child, push, IThemeData } from './index'; // ajuste conforme necessário

export const useHomeLogic = ({ lang, showAlert, navigateLobby, navigateGame }: any) => {
  const [checked, setChecked] = useState(1);
  const [name, setName] = useState('');
  const [codeRoom, setCodeRoom] = useState('');
  const [themes, setThemes] = useState<{ [key: string]: IThemeData }[]>([]);

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
      };

      if (nextPlayer) {
        update(ref(database), updates);
        navigateLobby({roomKey,nextPlayer})
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
          return showAlert(lang.copied_alert);
        }

        if (!(/^[a-zA-Z\s]*$/.test(name))) {
          console.error('Erro ao criar jogo: Nome do jogador inválido');
          return showAlert(lang.invalid_copied_alert);
        }

        const roomKey = generateRandomWord(6);

        await set(ref(database, 'hangman/rooms/' + roomKey), {
          turn: 'p1',
          indexTheme: checked,
          gameInProgress: false,
          selectedLetters: Array('-'),
          wordArray: Array('-'),
          selectedWord: { name: '', dica: '' }
        });

        console.info('Jogo criado com sucesso', { roomKey, playerName: name });
        createPlayer(roomKey, true, name);
      } else {
        navigateGame({checked, codeRoom})
        console.log('Jogo criado com sucesso');
      }
    } catch (e) {
      console.error('Erro ao criar jogo:', e);
      console.log(e);
    }
  }

  function enterRoomCode() {
    get(child(ref(database), 'hangman/rooms/' + codeRoom)).then((snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const playersObject = data.players || {};
        const numPlayers = Object.keys(playersObject).length;

        if (!data.gameInProgress && numPlayers < 8) {
          createPlayer(codeRoom, false, name);
        } else {
          console.warn(`Tentativa de entrada na sala ${codeRoom} falhou: sala cheia ou partida em andamento`);
          showAlert(lang.game_started_error_alert);
        }
      } else {
        console.warn(`Tentativa de entrada na sala ${codeRoom} falhou: sala inexistente`);
        showAlert(lang.invalid_code_error_alert);
      }
    }).catch((error: any) => {
      console.error(`Erro ao verificar a sala ${codeRoom}: ${error.message}`);
      showAlert(lang.try_again_error_alert);
    });
  }

  function joinRoom() {
    get(child(ref(database), 'hangman/rooms')).then((snapshot: any) => {
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
    }).catch((error: any) => {
      console.error(`Erro ao verificar as salas: ${error.message}`);
      showAlert(lang.try_again_error_alert);
    });
  }

  function play() {
    if (!name) {
      return showAlert(lang.copied_alert);
    }

    if (!(/^[a-zA-Z\s]*$/.test(name))) {
      return showAlert(lang.invalid_copied_alert);
    }

    if (!(/^[a-zA-Z\s]*$/.test(codeRoom))) {
      return showAlert(lang.invalid_code_error_alert);
    }

    if (codeRoom) {
      enterRoomCode();
    } else {
      joinRoom();
    }
  }

  return {
    checked,
    setChecked,
    name,
    setName,
    codeRoom,
    setCodeRoom,
    themes,
    createGame,
    enterRoomCode,
    joinRoom,
    play,
    setThemes
  };
};

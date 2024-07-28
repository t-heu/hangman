// packages/common/src/gameLogic.js
import { useState, useEffect } from 'react';
import { getNextPlayer, generateTheme,database, ref, update, onValue } from './index';

export const useLobbyLogic = ({ navigateGame, currentPlayerUID, code }: any) => {
  const [players, setPlayers] = useState<any>([]);
  const [playerKey, setPlayerKey] = useState<any>('');

  async function createGame(codeRoom: string, indexTheme: number, playersData?: any) {
    const nextPlayer = 'p' + getNextPlayer(`p${currentPlayerUID}`, playersData).uid;
    const {selectedWord, wordArray} = await generateTheme(indexTheme);
    const updates: any = {};
        
    updates['hangman/rooms/' + codeRoom + '/selectedLetters'] = Array('-');
    updates['hangman/rooms/' + codeRoom + '/selectedWord'] = selectedWord;
    updates['hangman/rooms/' + codeRoom + '/wordArray'] = wordArray;
    updates['hangman/rooms/' + codeRoom + '/gameInProgress'] = true;
    updates['hangman/rooms/' + codeRoom + '/turn'] = nextPlayer;
      
    update(ref(database), updates);
  }

  function playReady() {
    update(ref(database), { [`hangman/rooms/${code}/players/p${players[playerKey].uid}/ready`]: players[playerKey].ready ? false : true });
  }

  useEffect(() => {
    const minPlayers = 2;
    const maxPlayers = 8;

    onValue(ref(database, 'hangman/rooms/' + code), (snapshot: any) => {
      const data = snapshot.val();
      const playersArray: any = Object.values(data.players || {});
      const numPlayers = playersArray.length;
      setPlayers(playersArray);
      setPlayerKey(Object.keys(playersArray).find(key => playersArray[key].uid === currentPlayerUID))
      
      if (numPlayers >= minPlayers && numPlayers <= maxPlayers) {
        const allPlayersReady = playersArray.every((player: any) => player.ready && !player.gameover && !player.victory);
        if (allPlayersReady && !data.gameInProgress) {
          createGame(code, data.indexTheme, data.players);
          navigateGame()
        }
      }
    });
  }, []);

  return {
    playReady,
    createGame,
    playerKey,
    players
  };
};

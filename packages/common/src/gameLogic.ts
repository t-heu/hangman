// packages/common/src/gameLogic.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  getNextPlayer, 
  database, generateTheme, ref, 
  update, onValue, normalize, 
  monitorConnectionStatus,
  checkLetter 
} from './index'; // ajuste conforme necessário

interface Theme {
  selectedWord: {
    name: string;
    dica: string;
  }
  wordArray: string[]
}

export const useGameLogic = ({ lang, currentPlayerUID, code, indexTheme, navigateLobby }: any) => {
  const [gameState, setGameState] = useState<Theme>({
    selectedWord: { name: '', dica: '' },
    wordArray: []
  });
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [countErrors, setCountErrors] = useState(0);
  const [existLetter, setExistLetter] = useState('');
  const [statusGame, setStatusGame] = useState('play');
  const [players, setPlayers] = useState<any>({});
  const [winnerMessage, setWinnerMessage] = useState('');
  const [turn, setTurn] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stop = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    timerRef.current = null;
  };

  const start = () => {
    if (timerRef.current !== null) return; // Evita iniciar múltiplos temporizadores

    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          stop()
          setStatusGame('gameover');
          setWinnerMessage(`${lang.time_is_over_text}`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const updateGameInProgressState = useCallback((data: any) => {
    setSelectedLetters(data.selectedLetters);
    setGameState(prevState => ({
      ...prevState,
      selectedWord: data.selectedWord,
      wordArray: data.wordArray
    }));
    setStatusGame(`p${currentPlayerUID}` === data.turn ? 'play' : '')
    setPlayers(data.players);
  }, []);

  const updateGameState = useCallback((data: any, playersArray: any[]) => {
    const allPlayersReady = playersArray.every((player: any) => player.active && !player.gameover && !player.victory);
    const anyPlayerGameOverOrVictory = playersArray.some((player: any) => player.gameover || player.victory);

    if (allPlayersReady) {
      updateGameInProgressState(data);
    }

    if (data.players[data.turn]) {
      if (playersArray.length <= 1) {
        setStatusGame('gameover');
        setWinnerMessage(lang.game_status_text)
        update(ref(database), { [`hangman/rooms/${code}/gameInProgress`]: false });
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
      setStatusGame('gameover');
      const winner: any = Object.values(data.players).find((player: any) => player.victory);
      setWinnerMessage(winner ? `${winner.name} ${lang.winner_text}`: lang.game_over_text);
      update(ref(database), { [`hangman/rooms/${code}/gameInProgress`]: false });
    }
  }, [getNextPlayer, updateGameInProgressState]);

  const startMultiplayerGame = useCallback((snapshot: any) => {
    const data = snapshot.val();
    if (!data) return;

    const playersArray = Object.values(data.players || {});

    if (data.gameInProgress) {
      updateGameState(data, playersArray);
    }
  }, [updateGameState]);

  const handleVictory = useCallback(() => {
    setStatusGame('gameover');
    setWinnerMessage(lang.winner_solo_text);
    stop()

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
  }, [players, code]);

  const handleIncorrectGuess = useCallback(() => {
    setCountErrors(countErrors + 1);
    
    if (countErrors === 5) {
      setStatusGame('gameover');
      setWinnerMessage(lang.game_over_solo_text);
      stop(); // Clear timer on game end

      if (code) {
        const updates: any = {};

        Object.keys(players).forEach(key => updates[`hangman/rooms/${code}/players/${key}/gameover`] = true);
        update(ref(database), updates);
      } 
    }
  }, [countErrors, players, code]);

  const updateRoomState = useCallback((letter: string, newWordName: string[]) => {
    const updates: any = {};
    updates['hangman/rooms/' + code + '/selectedLetters'] = [...selectedLetters, letter];
    updates['hangman/rooms/' + code + '/wordArray'] = newWordName;

    const nextPlayer = 'p' + getNextPlayer(`p${currentPlayerUID}`, players).uid;
    updates['hangman/rooms/' + code + '/turn'] = nextPlayer;
    update(ref(database), updates);
  }, [selectedLetters, code, players]);

  const handleSelectLetter = useCallback((letter: string) => {
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);

      const matches = checkLetter(gameState.selectedWord.name, letter);
      const newWordName = gameState.selectedWord.name.split('').map((char, index) => matches[index] ? char : gameState.wordArray[index]);

      const isNotEmpty = newWordName.every((char) => char !== '');
      if (isNotEmpty) {
        handleVictory();
      }

      const normalizedWordName = newWordName.map(normalize);
      const normalizedLetter = normalize(letter);

      if (!normalizedWordName.includes(normalizedLetter)) {
        handleIncorrectGuess();
      } else {
        if (!code) setTimeRemaining(prevTime => prevTime + 1);
      }

      if (code) {
        updateRoomState(letter, newWordName);
      }  

      setGameState(prevState => ({
        ...prevState,
        wordArray: newWordName
      }));
    } else {
      setExistLetter(`${letter} ${lang.letter_already_used_text}`)
    }
  }, [selectedLetters, gameState.selectedWord.name, gameState.wordArray, handleVictory, handleIncorrectGuess, updateRoomState]);

  const startOffGame = useCallback(async () => {
    const { selectedWord, wordArray } = await generateTheme(indexTheme === undefined ? 4 : indexTheme);

    setGameState({
      selectedWord: selectedWord,
      wordArray: wordArray
    });
    setSelectedLetters([]);
    setCountErrors(0);
    setExistLetter('');
    setStatusGame('play');
    setTimeRemaining(30);
    stop(); // Clear timer on game end
    start()
  }, [indexTheme])

  const restartGame = useCallback(() => {
    if (code) {
      const playerKey = 'p' + currentPlayerUID;
      
      if (playerKey) {
        const updates: any = {};
        updates[`hangman/rooms/${code}/players/${playerKey}/gameover`] = false;
        updates[`hangman/rooms/${code}/players/${playerKey}/victory`] = false;
        updates[`hangman/rooms/${code}/players/${playerKey}/ready`] = false;
        update(ref(database), updates);
      }

      navigateLobby()
    } else {
      startOffGame();
    }
  }, [code, currentPlayerUID, navigateLobby, startOffGame]);

  useEffect(() => {
    if (code) {
      const roomRef = ref(database, 'hangman/rooms/' + code);
      onValue(roomRef, startMultiplayerGame);
      monitorConnectionStatus(code, currentPlayerUID)
    } else {
      startOffGame();
    }
  }, [code, startMultiplayerGame, startOffGame, currentPlayerUID]);

  return {
    turn, timeRemaining, gameState, statusGame, restartGame, winnerMessage, existLetter, countErrors, players, handleSelectLetter
  };
}

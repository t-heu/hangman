import { database, ref, update, onValue, onDisconnect, remove } from '../index'

export function monitorConnectionStatus(roomCode: string, playerKey: string) {
  const playerRef = ref(database, `hangman/rooms/${roomCode}/players/p${playerKey}`);
  const connectedRef = ref(database, '.info/connected');
  // Atualizar o status de conexão do jogador quando ele se desconectar
  onDisconnect(playerRef).remove()

  // Monitorar o status de conexão do jogador
  onValue(connectedRef, () => {
    remove(ref(database, `hangman/rooms/${roomCode}/p${playerKey}`));
  });
}

export function exitPlayer(roomCode: string, playerKey: string) {
  const updates: any = {};
  updates[`hangman/rooms/${roomCode}/players/p${playerKey}`] = null;
  update(ref(database), updates);
}
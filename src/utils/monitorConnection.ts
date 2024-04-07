import { database, ref, update, onValue, onDisconnect, remove } from '../api/firebase'

export function monitorConnectionStatus(roomCode: string, playerKey: number) {
  const playerRef = ref(database, `hangman/rooms/${roomCode}/players/p${playerKey}`);
  const connectedRef = ref(database, '.info/connected');
  // Atualizar o status de conexão do jogador quando ele se desconectar
  onDisconnect(playerRef).remove()
  //update({ active: false });

  // Monitorar o status de conexão do jogador
  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      update(playerRef, { active: true });
    } else {
      //update(playerRef, { active: false });
      remove(ref(database, `hangman/rooms/${roomCode}/p${playerKey}`));
    }
  });
}

export function exitPlayer(roomCode: string, playerKey: number) {
  const updates: any = {};
  updates[`hangman/rooms/${roomCode}/players/p${playerKey}`] = null;
  update(ref(database), updates);
}
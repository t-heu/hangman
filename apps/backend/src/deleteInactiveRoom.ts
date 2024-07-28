import { database, ref, get, child, remove } from "common";

/**
 * Deleta salas inativas que não têm jogadores.
 */
export function deleteInactiveRoom() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(child(ref(database), "hangman/rooms")).then((snapshot: any) => {
    if (snapshot.exists()) {
      const rooms = snapshot.val();

      Object.keys(rooms).some(async (roomKey) => {
        const room = rooms[roomKey];
        const playersObject = room.players || {};
        const numPlayers = Object.keys(playersObject).length;

        console.info(`Sala ${roomKey} encontrada!`);

        if (numPlayers === 0) {
          try {
            await remove(ref(database, `hangman/rooms/${roomKey}`));
            console.info(`Sala ${roomKey} excluída com sucesso`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            console.error(`Erro ao excluir a sala ${roomKey}: ` +
              `${error.message}`);
          }
        }
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).catch((error: any) => {
    console.error(`Erro ao verificar as salas: ${error.message}`);
  });
}
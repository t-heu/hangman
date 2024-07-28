export default function getNextPlayer(currentPlayerKey: string, allPlayers: any) {
  const keys = Object.keys(allPlayers);
  const currentIndex = keys.indexOf(currentPlayerKey);
  const nextIndex = (currentIndex + 1) % keys.length; // Circula de volta para o início se atingir o último jogador
  return allPlayers[keys[nextIndex]];
}
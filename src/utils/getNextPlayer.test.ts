import getNextPlayer from "./getNextPlayer"

describe('getNextPlayer', () => {
  it('deve retornar o próximo jogador corretamente', () => {
    // Defina a entrada para a função
    const currentPlayerKey = 'player1';
    const allPlayers = {
      'player1': { name: 'Jogador 1' },
      'player2': { name: 'Jogador 2' },
      'player3': { name: 'Jogador 3' },
    };

    // Chame a função que está sendo testada
    const nextPlayer = getNextPlayer(currentPlayerKey, allPlayers);

    // Asserte o resultado esperado
    expect(nextPlayer).toEqual({ name: 'Jogador 2' });
  });

  
  it('deve retornar o primeiro jogador se for o último jogador', () => {
    const currentPlayerUID = 'player3';
    const playersData = {
      'player1': { name: 'Jogador 1' },
      'player2': { name: 'Jogador 2' },
      'player3': { name: 'Jogador 3' },
    };
    
    const nextPlayer = getNextPlayer(`p${currentPlayerUID}`, playersData);
    
    expect(nextPlayer).toEqual({ name: 'Jogador 1' });
  });
});
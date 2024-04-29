import { monitorConnectionStatus, exitPlayer } from './monitorConnection';
import { update, remove } from '../api/firebase'

// Mock das funções e props necessárias para o teste
jest.mock('../api/firebase', () => ({
  ref: jest.fn().mockReturnValueOnce({ // Aqui você pode usar mockReturnValueOnce no retorno da função ref
    remove: jest.fn()
  }),
  update: jest.fn(),
  onDisconnect: jest.fn(() => ({
    remove: jest.fn()
  })),
  remove: jest.fn(),
  database: jest.fn(),
  onValue: jest.fn((ref, callback) => {
    // Simular chamada do callback com um valor falso
    callback({ val: () => false });
  }),
}));

describe('Firebase functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('monitorConnectionStatus deve remover jogador quando desconectado', () => {
    const roomCode = '123';
    const playerKey = 'user123';

    // Chama a função monitorConnectionStatus
    monitorConnectionStatus(roomCode, playerKey);

    // Simula a desconexão chamando o callback com false
    const onValueCallback = jest.fn();
    onValueCallback({ val: () => false });

    // Verifica se a função remove foi chamada corretamente
    expect(remove).toHaveBeenCalled();
  });

  it('exitPlayer deve atualizar status do jogador corretamente', () => {
    const roomCode = '123';
    const playerKey = 'user123';

    // Chama a função exitPlayer
    exitPlayer(roomCode, playerKey);

    // Verifica se a função update foi chamada corretamente
    expect(update).toHaveBeenCalled();
  });
});

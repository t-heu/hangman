import { monitorConnectionStatus, exitPlayer } from './monitorConnection';
import { database, ref, update, onValue, onDisconnect, remove } from '../api/firebase'

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
  onValue: jest.fn(() => ({
    remove: jest.fn()
  })),
}));

describe('Firebase functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let originalBeforeUnload: any;

  beforeAll(() => {
    // Salva a referência para a função original de beforeunload
    originalBeforeUnload = window.onbeforeunload;
    // Substitui a função original de beforeunload por uma função vazia
    window.onbeforeunload = () => {};
  });

  afterAll(() => {
    // Restaura a função original de beforeunload após os testes
    window.onbeforeunload = originalBeforeUnload;
  });

  it('monitorConnectionStatus deve remover jogador quando desconectado', () => {
    const roomCode = '123';
    const playerKey = 'user123';

    // Simula desconexão chamando o callback com false
    originalBeforeUnload()

    // Chama a função monitorConnectionStatus
    monitorConnectionStatus(roomCode, playerKey);

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

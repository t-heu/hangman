import "dotenv/config";
import { schedule } from "node-cron";

import { deleteInactiveRoom } from "./deleteInactiveRoom"
import { saveAITheme } from "./saveAITheme"

// Agendar função diária para executar todos os dias às 00:00 (meia-noite)
schedule('0 0 * * *', () => {
  saveAITheme();
  console.log("Tema atualizado!")
});

// Agendar função semanal para executar todos os domingos às 00:00 (meia-noite)
schedule('0 0 * * 0', () => {
  deleteInactiveRoom();
  console.log("Salas inativas deletadas!")
});

// Manter o processo em execução
console.log("Tarefas agendadas. O sistema está em execução.");

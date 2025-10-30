import type { TaskModel } from '../models/TaskModels';

export function getTaskStatus(tarefa: TaskModel) {
  if (tarefa.interruptDate !== null) return 'Interrompida';
  if (tarefa.completeDate !== null) return 'Finalizado';

  if (tarefa.startDate !== null) return 'Em Progresso';
  // return 'Amabadonada...';
  return tarefa.abandonada === 'sim' ? 'Dropped Out' : 'BRINCADEIRA POW';
}

// export function getTaskStatus(tarefa: TaskModel, ativa: TaskModel | null) {
//   if (tarefa.completeDate !== null) return 'Finalizado';
//   if (tarefa.interruptDate !== null) return 'Interrompida';
//   if (tarefa.id === ativa?.id) return 'Em Progresso';
//   return 'Amabadonada...';
// }

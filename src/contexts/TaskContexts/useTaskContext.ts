import { useContext } from 'react';
import { TaskContext } from './TaskCOntext';

export function useTaskContext() {
  return useContext(TaskContext);
}

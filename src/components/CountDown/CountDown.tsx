import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import Estilo from './Estilos.module.css';

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={Estilo.container}>{state.formattedSecondsRemaining}</div>
  );
}

import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import Estilos from './Estilos.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const arraySteps = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanço curto',
    longBreakTime: 'descanço longo',
  };

  return (
    <div className={Estilos.cycles_container}>
      <span>Ciclos: </span>

      <div className={Estilos.cylesDots}>
        {arraySteps.map((_, index) => {
          const cycleNumber = getNextCycle(index);
          const cycleType = getNextCycleType(cycleNumber);
          return (
            <span
              key={`${cycleType}_${cycleNumber}`}
              className={`${Estilos.cycledot} ${Estilos[cycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[cycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[cycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${Estilos.cycledot} ${Estilos.workTime}`}></span> */}
        {/* <span
          className={`${Estilos.cycledot} ${Estilos.shortBreakTime}`}
        ></span>
        <span className={`${Estilos.cycledot} ${Estilos.workTime}`}></span>
        <span
          className={`${Estilos.cycledot} ${Estilos.shortBreakTime}`}
        ></span>
        <span className={`${Estilos.cycledot} ${Estilos.workTime}`}></span>
        <span
          className={`${Estilos.cycledot} ${Estilos.shortBreakTime}`}
        ></span>
        <span className={`${Estilos.cycledot} ${Estilos.workTime}`}></span>
        <span className={`${Estilos.cycledot} ${Estilos.longBreakTime}`}></span> */}
      </div>
    </div>
  );
}

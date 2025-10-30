import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  const nextCyleInfo = getNextCycle(state.currentCycle);

  const nextCycleType = getNextCycleType(nextCyleInfo);

  const tipsForWhenActiveTask = {
    workTime: <span>foque por {state.config?.workTime} min</span>,
    shortBreakTime: (
      <span>descanse por {state.config?.shortBreakTime} min</span>
    ),
    longBreakTime: <span>Descanço longo</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>O próximo clico será de {state.config?.workTime} min</span>,
    shortBreakTime: (
      <span>o próximo Descanço será de {state.config?.shortBreakTime} min</span>
    ),
    longBreakTime: 'proximo descanso será longo',
  };
  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}

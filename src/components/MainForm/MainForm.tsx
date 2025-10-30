// PlayCircleIcon,
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { MeuInput } from '../MeuInput';
import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import type React from 'react';
import { useEffect, useRef } from 'react';
import type { TaskModel } from '../../models/TaskModels';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionType } from '../../contexts/TaskContexts/TaskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';
// import { timeWorkerManager } from '../../workers/timeWorkerManager';

// let liberado = 'Livre';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const lastTaskRan =
    (state.tasks && state.tasks[state.tasks?.length - 1]?.name) || '';
  // const [newTask, setNewTask] = useState('');
  const ELInput = useRef<HTMLInputElement>(null);

  function handleChangeCountdown() {
    // setState(prevState => {
    //   return {
    //     ...prevState,
    //     formattedSecondsRemaining: new Date().toLocaleTimeString(),
    //   };
    // });
  }
  const nextCyleInfo = getNextCycle(state.currentCycle);

  const nextCycleType = getNextCycleType(nextCyleInfo);

  function handleCreateNewCycle(e: React.FormEvent<HTMLFormElement>) {
    // liberado = 'Ocupado';
    e.preventDefault();
    showMessage.dismiss();

    if (ELInput.current?.value === '') {
      showMessage.warn('Informe um nome para a Tarefa!');
      return;
    }

    if (ELInput.current !== null && ELInput.current.value !== '') {
      const TaskNewName = ELInput.current.value.trim();
      const newTaskeCreated: TaskModel = {
        id: Date.now().toString(),
        name: TaskNewName,
        abandonada: 'não',
        startDate: Date.now(),
        completeDate: null,
        interruptDate: null,
        duration: state.config[nextCycleType],
        type: nextCycleType,
      };

      dispatch({ type: TaskActionType.START_TASK, payload: newTaskeCreated });
      showMessage.sccsess('Tarefa Iniciada');
      showMessage.info('Duas');
      // const worker = timeWorkerManager.getInstance();

      // worker.postMessage('ola seu job foi finalizado');

      // worker.onmessage(e => {
      //   console.log('Roger::: ' + e.data);
      // });
    }
  }

  function handleInterruptTask() {
    // liberado = 'livre';
    // setState(prevState => {
    //   return {
    //     ...prevState,
    //     activeTask: null,
    //     secondsRemaining: 0,
    //     formattedSecondsRemaining: '00:00',
    //     tasks: prevState.tasks.map(taska => {
    //       if (prevState.activeTask && prevState.activeTask.id === taska.id) {
    //         return { ...taska, interruptDate: Date.now() };
    //       }
    //       return taska;
    //     }),
    //   };
    // });
    showMessage.dismiss();
    dispatch({ type: TaskActionType.INTERRUPT_TASK });
    showMessage.error('Tarefa Interrompida');
  }

  useEffect(() => {
    if (state.activeTask) {
      // liberado = 'Ocupado';
    }
  });

  return (
    <form action='' className='meuform' onSubmit={handleCreateNewCycle}>
      <button type='button' onClick={handleChangeCountdown}>
        Mudar Valor Countdown...
      </button>
      <div className='formrow'>
        <MeuInput
          type='text'
          id='meuInputa'
          labelText='ooooopa'
          placeholder='Digite algo...'
          // value={newTask}
          // onChange={e => setNewTask(e.target.value)}
          ref={ELInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskRan}
        />
      </div>

      <div className='formrow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formrow'>
          <Cycles />
        </div>
      )}

      <div className='formrow'>
        {!state.activeTask && (
          <DefaultButton
            icon={<PlayCircleIcon />}
            type='submit'
            color='green'
            // disabled={true}
            aria-label='Começar uma nova tarefa'
            title='Começar uma nova tarefa'
          >
            BOSTA COCO
          </DefaultButton>
        )}

        {state.activeTask && (
          <DefaultButton
            icon={<StopCircleIcon />}
            type='button'
            color='red'
            // disabled={true}
            aria-label='Parar Tarefa'
            title='Parar Tarefa'
            onClick={handleInterruptTask}
          >
            BOSTA COCO
          </DefaultButton>
        )}
      </div>
    </form>
  );
}

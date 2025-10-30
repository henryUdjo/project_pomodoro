import { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskCOntext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { timeWorkerManager } from '../../workers/timeWorkerManager';
import { TaskActionType } from './TaskActions';
// import type { TaskStateModel } from '../../models/TaskStateModel';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskModel } from '../../models/TaskModels';
// import type { TaskModel } from '../../models/TaskModels';
// import type { TaskStateModel } from '../../models/TaskStateModel';
// import type { TaskModel } from '../../models/TaskModels';
// import type { TaskModel } from '../../models/TaskModels';
// import type { TaskModel } from '../../models/TaskModels';
// import type { TaskModel } from '../../models/TaskModels';
// import type { TaskStateModel } from '../../models/TaskStateModel';
// import { useState } from 'react';

type TaskContextsProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextsProviderProps) {
  // const [pisca, setPisca] = useState(false);
  const kontagem = useRef(0);

  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    kontagem.current = kontagem.current + 1;
    const currentState = localStorage.getItem('state');
    console.log('------->>>: ', kontagem.current);
    if (currentState === null) {
      console.log('POBREMA AKY');

      return initialTaskState;
    }

    const currentStateFromJson = JSON.parse(currentState);

    console.log('D.I.S.P.L.A.Y');
    console.log(currentStateFromJson);
    console.log('D.I.S.P.L.A.Y');

    return currentStateFromJson;
  });

  const playBeep = useRef<ReturnType<typeof loadBeep> | null>(null);

  const workar = timeWorkerManager.getInstance();

  workar.onmessage(evento => {
    const segundosRestante = evento.data as number;

    if (segundosRestante <= -1) {
      if (playBeep.current) {
        console.log('Playing audio...');
        playBeep.current();
        playBeep.current = null;
      }
      // console.log('worker terminated...');
      // console.log('@@ SPECIAL EDITION @@');
      // console.log(state);
      // console.log('@@ SPECIAL EDITION @@');
      if (
        state.tasks[state.tasks.length - 1]?.abandonada === 'não' &&
        state.tasks[state.tasks.length - 1]?.interruptDate === null &&
        state.tasks[state.tasks.length - 1]?.startDate &&
        state.tasks[state.tasks.length - 1]?.completeDate === null
      ) {
        console.log('## COMPARE ###');
        console.log(state);

        console.log('## COMPARE ###');
        workar.terminate();
        dispatch({ type: TaskActionType.COMPLETE_TASK });
        return;
      }
    }

    if (
      state.tasks[state.tasks.length - 1]?.completeDate === null &&
      state.tasks[state.tasks.length - 1]?.abandonada === 'não'
    ) {
      console.log('__ITERADO__');
      dispatch({
        type: TaskActionType.COUNT_DOWN,
        payload: { secondsRemaining: segundosRestante },
      });
    }

    // if (state.tasks[state.tasks.length - 1].startDate !== null) {
  });

  useEffect(() => {
    console.log('OWNN YAEH STATE');
    console.log(state);
    console.log('OWNN YAEH STATE');
  }, [state]);

  useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask');
      workar.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    workar.postMessage(state);
  }, [workar, state]);

  useEffect(() => {
    if (state.activeTask && playBeep.current === null) {
      console.log('Audio Carregando...');
      playBeep.current = loadBeep();
    } else {
      console.log('Zerando o audio..');
      playBeep.current = null;
    }
  }, [state.activeTask]);

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     const grabTasks = JSON.parse(localStorage.getItem('state') as string);

  //     const objetoRenovado = {
  //       ...grabTasks,
  //       tasks: grabTasks.tasks.map((t: TaskModel) => {
  //         console.log('EULER HENRIQUE');
  //         return { ...t, abandonada: 'sim' };
  //       }),
  //     };
  //     console.log(objetoRenovado);
  //     localStorage.setItem('state', JSON.stringify(objetoRenovado));
  //     // localStorage.setItem('sim', 'eu atesto queisso esta acontecendo');
  //     // setPisca(!pisca);

  //     return '';
  //   };
  // }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      // const grabTasks = JSON.parse(localStorage.getItem('state') as string);

      // console.log('A PONNY TAIL');
      // console.log(state);
      // console.log('A PONNY TAIL');
      // kontagem.current = kontagem.current + 1;
      // console.log('ONBEFOREUNLOAD:::: ', kontagem.current);
      if (
        state.tasks[state.tasks.length - 1].completeDate === null &&
        state.tasks[state.tasks.length - 1].interruptDate === null &&
        state.tasks[state.tasks.length - 1].startDate &&
        state.tasks[state.tasks.length - 1].abandonada === 'não'
      ) {
        const objetoRenovado = {
          ...state,
          // activeTask: null,
          tasks: state.tasks.map((t: TaskModel, index: number) => {
            if (state.tasks.length - 1 === index) {
              console.log('TOMA NO TOBA PORRA');
              return {
                ...t,
                abandonada: 'sim',
                completeDate: null,
                interruptDate: null,
                startDate: null,
              };
            } else {
              return {
                ...t,
                // topCurrent: null,
                // startDate: null,
              };
            }
          }),
        };
        console.log(objetoRenovado);
        localStorage.setItem('state', JSON.stringify(objetoRenovado));
        // dispatch({
        //   type: TaskActionType.UPTODATE,
        //   payload: objetoRenovado,
        // });
      }

      return '';
    };
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

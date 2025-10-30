// import type { TaskModel } from '../../models/TaskModels';
import type { TaskModel } from '../../models/TaskModels';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinute } from '../../utils/formatSecondsToMinute';
import { getNextCycle } from '../../utils/getNextCycle';
// import { initialTaskState } from './initialTaskState';
import { TaskActionType } from './TaskActions';
import type {
  TaskActionModelWithPayLoad,
  TaskActionModelWithOutPayLoad,
} from './TaskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModelWithPayLoad | TaskActionModelWithOutPayLoad,
): TaskStateModel {
  console.log('***ECHO*****');
  console.log(action.type);
  console.log('***ECHO*****');

  switch (action.type) {
    case TaskActionType.START_TASK: {
      const novaTarefa = action.payload;

      const nextCyleInfo = getNextCycle(state.currentCycle);
      const secondsRemaining = novaTarefa.duration * 60;
      const contruido = {
        ...state,
        activeTask: novaTarefa,
        currentCycle: nextCyleInfo,
        especial: Date.now(),
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinute(secondsRemaining),
        tasks: [...state.tasks, novaTarefa],
      };

      console.log('NE POSSIVEL NAO');
      console.log(contruido);
      console.log('NE POSSIVEL NAO');

      localStorage.setItem('state', JSON.stringify(contruido));
      return contruido;
    }

    case TaskActionType.INTERRUPT_TASK: {
      const lastRunning = state.tasks[state.tasks.length - 1];

      if (
        lastRunning?.abandonada === 'sim' ||
        lastRunning?.completeDate !== null
      ) {
        return { ...state, activeTask: null };
      }

      // [COMMENT THOSE LINES ABOVE MAKE USEREDUCER GRABS THE BELOW CONFIGURATION
      //   OF THE STATE ALLOWING MODIFY FROM DROPPED OUT TO INTERRUPTED
      // ]

      const tarefa_interrompida = {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        coffe_mug: 'YEAH I WILL HAVE SOME',
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {
              ...task,
              interruptDate: Date.now(),
              // startDate: null,
              // completeDate: null,
              abandonada: 'não',
            };
          }
          return task;
        }),
      };
      localStorage.setItem('state', JSON.stringify(tarefa_interrompida));
      return tarefa_interrompida as TaskStateModel;
    }

    case TaskActionType.UPTODATE: {
      const montagem = {
        // ...state,
        ...action.payload,
      };

      localStorage.setItem('state', JSON.stringify(montagem));
      return montagem;
    }

    case TaskActionType.SAVE_SETTINGS: {
      const newSettingss = {
        ...state,
        config: {
          ...action.payload,
        },
      };
      localStorage.setItem('state', JSON.stringify(newSettingss));
      return newSettingss;
    }

    case TaskActionType.COMPLETE_TASK: {
      console.log('EM QUE PONTO DA LINHA DO TEMPO????');
      const tareFCompleta = {
        ...state,
        // activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
      localStorage.setItem('state', JSON.stringify(tareFCompleta));
      return tareFCompleta;
    }

    case TaskActionType.RESET_STATE: {
      return { ...state, tasks: [] };
    }

    case TaskActionType.COUNT_DOWN: {
      return {
        ...state,

        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinute(
          action.payload.secondsRemaining,
        ),
        tasks: state.tasks.map((t: TaskModel, index: number) => {
          if (state.tasks.length - 1 === index) {
            return { ...t, completeDate: null };
          } else {
            return { ...t };
          }
        }),
      };
    }
    default: {
      return state;
    }
  }
}

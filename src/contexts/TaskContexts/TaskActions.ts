import type { TaskModel } from '../../models/TaskModels';
import type { TaskStateModel } from '../../models/TaskStateModel';

export enum TaskActionType {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  UPTODATE = 'UPTODATE',
  SAVE_SETTINGS = 'SAVE_SETTINGS',
}

export type TaskActionModelWithPayLoad =
  | {
      type: TaskActionType.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionType.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActionType.UPTODATE;
      payload: TaskStateModel;
    }
  | {
      type: TaskActionType.SAVE_SETTINGS;
      payload: TaskStateModel['config'];
    };

export type TaskActionModelWithOutPayLoad =
  | {
      type: TaskActionType.RESET_STATE;
    }
  | {
      type: TaskActionType.INTERRUPT_TASK;
      // payload: TaskModel;
    }
  | {
      type: TaskActionType.COMPLETE_TASK;
      // payload: TaskModel;
    };

export type TaskActionModel =
  | TaskActionModelWithPayLoad
  | TaskActionModelWithOutPayLoad;

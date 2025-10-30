import { useState, useEffect } from 'react';

import { Trash2Icon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate/MainTemplate';
import Estilos from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import type { TaskModel } from '../../models/TaskModels';
import { TaskActionType } from '../../contexts/TaskContexts/TaskActions';
import { showMessage } from '../../adapters/showMessage';
// const compFixo = (
//   <div>
//     <h3>Apagando historico...</h3>
//   </div>
// );

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  // const TaskReordered = [...state.tasks].sort((a, b) => {
  //   return (b.startDate as number) - (a.startDate as number);
  // });
  const [historyClearing, setHistoryClearing] = useState(false);
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'asc',
      };
    },
  );

  function handleTaskOptions({ field }: Pick<SortTasksOptions, 'field'>) {
    const toggleDirection =
      sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';

    setSortTaskOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        field,
        direction: toggleDirection,
      }),
      field,
      direction: toggleDirection,
    });
  }

  useEffect(() => {
    setSortTaskOptions(prevState => {
      return {
        tasks: sortTasks({
          tasks: state.tasks,
          direction: sortTasksOptions.direction,
        }),
        field: prevState.field,
        direction: prevState.direction,
      };
    });
  }, [state.tasks]);

  useEffect(() => {
    // if (!historyClearing) return;
    if (historyClearing) {
      dispatch({ type: TaskActionType.RESET_STATE });
    }
    // setHistoryClearing(false);

    return () => {
      showMessage.dismiss();
    };
  }, [historyClearing, dispatch]);

  function handleClearHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem Certeza?', confirma => {
      setHistoryClearing(confirma as boolean);
      // if (confirma) {
      //   dispatch({ type: TaskActionType.RESET_STATE });
      // }
    });
  }

  useEffect(() => {
    document.title = '-History-';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={Estilos.buttonContainer}>
              <DefaultButton
                icon={<Trash2Icon />}
                color='red'
                aria-label='apagar todo o historico'
                title='apagar historico'
                onClick={handleClearHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        <div className={Estilos.responsiveTable}>
          {hasTasks && (
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleTaskOptions({ field: 'name' })}
                    className={Estilos.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleTaskOptions({ field: 'duration' })}
                    className={Estilos.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleTaskOptions({ field: 'startDate' })}
                    className={Estilos.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((taska: TaskModel) => {
                  const TaskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso Curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={Math.random().toString(36).substr(2, 9)}>
                      <td>{taska.name}</td>
                      <td>{taska.duration}</td>
                      <td>{formatDate(taska.startDate as number)}</td>
                      {/* <td>{getTaskStatus(taska, state.activeTask)}</td> */}
                      <td>{getTaskStatus(taska)}</td>

                      <td>{TaskTypeDictionary[taska.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!hasTasks && (
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Você ainda não possui historico!
            </p>
          )}
        </div>
      </Container>
    </MainTemplate>
  );
}

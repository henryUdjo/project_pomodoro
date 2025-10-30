import { useEffect, useRef, useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MeuInput } from '../../components/MeuInput';
import { MainTemplate } from '../../templates/MainTemplate/MainTemplate';
import type { FormEvent } from 'react';
import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionType } from '../../contexts/TaskContexts/TaskActions';
// import { set } from 'date-fns';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const [salvo, setSalvo] = useState(false);
  const worTimeInp = useRef<HTMLInputElement>(null);
  const shortBreakTimeInp = useRef<HTMLInputElement>(null);
  const longBreakTimeInp = useRef<HTMLInputElement>(null);

  function handleConfigChanges(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const Wt = Number(worTimeInp.current?.value);
    const St = Number(shortBreakTimeInp.current?.value);
    const Lt = Number(longBreakTimeInp.current?.value);

    console.log(Wt, St, Lt);

    const formErros: string[] = [];
    if (isNaN(Wt)) {
      formErros.push('Favor so inserir valores numericos 01');
      // return;
    }

    if (isNaN(St)) {
      formErros.push('Favor so inserir valores numericos 02');
      // return;
    }

    if (isNaN(Lt)) {
      formErros.push('Favor so inserir valores numericos 03');
      // return;
    }

    if (St < 1 || St > 30) {
      formErros.push('descanso curto deve esta entre 1-30');
    }

    if (Wt < 1 || Wt > 99) {
      formErros.push('WorkTime deve esta entre 1-99, para foco');
    }

    if (Lt < 1 || Lt > 60) {
      formErros.push('para descanso longo valores entre 1-60');
    }

    if (formErros.length > 0) {
      formErros.forEach(error => {
        showMessage.error(error);
      });
    } else {
      // showMessage.sccsess('ESTA A SALVAR...');
      dispatch({
        type: TaskActionType.SAVE_SETTINGS,
        payload: {
          workTime: Wt,
          longBreakTime: Lt,
          shortBreakTime: St,
        },
      });
      setSalvo(!salvo);
    }
  }

  useEffect(() => {
    document.title = '%Settings%';
  }, []);

  useEffect(() => {
    // showMessage.dismiss();

    if (salvo !== false) {
      if (
        state.config.longBreakTime !==
          (longBreakTimeInp.current?.value as unknown as number) ||
        state.config.shortBreakTime !==
          (shortBreakTimeInp.current?.value as unknown as number) ||
        state.config.workTime !==
          (worTimeInp.current?.value as unknown as number)
      ) {
        showMessage.sccsess('Configurações atualizadas sim senhor!');
      }
    }
  }, [salvo]);

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações...</Heading>
      </Container>

      <Container>
        <p>
          Modifique as Configurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form action='' className='form' onSubmit={e => handleConfigChanges(e)}>
          <div className='formrow'>
            <MeuInput
              labelText='Foco'
              id='workTime'
              ref={worTimeInp}
              defaultValue={state.config.workTime}
            />
          </div>
          <div className='formrow'>
            <MeuInput
              labelText='Descanso Curto'
              id='shortBreakTime'
              ref={shortBreakTimeInp}
              defaultValue={state.config.longBreakTime}
            />
          </div>
          <div className='formrow'>
            <MeuInput
              labelText='Descanso Longo'
              id='longBreakTime'
              ref={longBreakTimeInp}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className='formrow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='salvar configurações'
              title='salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}

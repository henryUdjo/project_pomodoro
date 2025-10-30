import { useEffect } from 'react';
// import { useState } from 'react';
import { useRef } from 'react';

import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate/MainTemplate';
// import { rotasAtivas } from '../../transitionalInfos';
// import { useTaskContext } from '../../contexts/TaskContexts/useTaskContext';

export function Home() {
  const novoTitulo = useRef('');
  useEffect(() => {
    const fromError = localStorage.getItem('404');
    if (fromError) {
      requestAnimationFrame(() => {
        novoTitulo.current = fromError;
        document.title = novoTitulo.current;
        console.log('SHOWWWWW MEEEEE');
        console.log(typeof novoTitulo.current);
        console.log(document.title);
        console.log('SHOWWWWW MEEEEE');
        localStorage.removeItem('404');
      });
    } else {
      requestAnimationFrame(() => {
        document.title = 'CIPOMODORO';
      });
    }
  }, []);

  // useEffect(() => {
  //   document.title = novoTitulo.current;
  // }, [liga]);

  // useEffect(() => {
  //   const fromError = localStorage.getItem('404');

  //   console.log('THE TILE GOES TO::');
  //   console.dir(document);
  //   console.log('THE TILE GOES TO::');
  //   document.title = fromError ? fromError : '******';
  // }, [document]);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}

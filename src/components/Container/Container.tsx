import type { ReactNode } from 'react';
import Estilo from './Estilos.module.css';

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className={Estilo.container}>
      <div className={Estilo.contennt}>{children}</div>
    </div>
  );
}

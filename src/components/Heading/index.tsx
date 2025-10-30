import React from 'react';

// import { Container } from './styles';
import '../../style/global.css';
import estilos from './Estilos.module.css';

type HeadingProps = {
  children?: React.ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <p className={estilos.heading}> {children}</p>;
}

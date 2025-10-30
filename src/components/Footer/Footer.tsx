import Estilos from './Estilos.module.css';
import { AdapterRouter } from '../AdapterRouter/AdapterRouter';

export function Footer() {
  return (
    <footer className={Estilos.footer}>
      <AdapterRouter href='/about-pomodoro'>
        Entenda como funciona a tecnica Pomodoro
      </AdapterRouter>
      <AdapterRouter href='/about-pomodoro'>
        Chronos Pomodoro &copy; {new Date().getFullYear()}- Feito com ❤
      </AdapterRouter>
    </footer>
  );
}

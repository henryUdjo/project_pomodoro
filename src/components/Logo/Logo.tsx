import { TimerIcon } from 'lucide-react';
import Estilos from './Estilo.module.css';
import { AdapterRouter } from '../AdapterRouter/AdapterRouter';

export function Logo() {
  return (
    <div className={Estilos.logo}>
      <AdapterRouter href='/' className={Estilos.logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </AdapterRouter>
    </div>
  );
}

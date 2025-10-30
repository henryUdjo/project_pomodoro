type DefaultButton = {
  icon: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

import Estilos from './Estilos.module.css';

export function DefaultButton({
  color = 'green',
  icon,
  ...props
}: DefaultButton) {
  return (
    <button className={`${Estilos.butao} ${Estilos[color]}`} {...props}>
      {icon}
    </button>
  );
}

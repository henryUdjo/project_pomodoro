import Estilos from './Estilos.module.css';

type MeuInoutProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export function MeuInput({ type, id, labelText, ...rest }: MeuInoutProps) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <input className={Estilos.input} id={id} type={type} {...rest} />
    </>
  );
}

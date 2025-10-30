import Estilo from './Estilos.module.css';

type GenericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
  return <div className={Estilo.genericHtml}>{children}</div>;
}

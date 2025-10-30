import type { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

import Estilos from './Estilos.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={Estilos.container}>
        <p>{data}</p>

        <div className={Estilos.buttonsContainer}>
          <DefaultButton
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label='confirma ação e fechar'
            title='confirma ação e fechar'
          />

          <DefaultButton
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            color='red'
            aria-label='confirma ação e fechar'
            title='confirma ação e fechar'
          />
        </div>
      </div>
    </>
  );
}

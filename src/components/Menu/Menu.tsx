import { useState, useEffect } from 'react';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import Estilos from './Estilos.module.css';
import { AdapterRouter } from '../AdapterRouter/AdapterRouter';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const temaInStorage =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return temaInStorage;
  });

  const SetNextTheamIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChanging(
    evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    evento.preventDefault();
    setTheme(prevTheme => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
    return () => {
      console.log('qual será minha ordem de execução? vc sabe?');
    };
  }, [theme]);

  return (
    <nav className={Estilos.menu}>
      <AdapterRouter
        href='/'
        className={Estilos.menuLink}
        aria-label='ir para home'
        title='ir para home'
      >
        <HouseIcon />
      </AdapterRouter>

      <AdapterRouter
        href='/history'
        className={Estilos.menuLink}
        aria-label='Consultar Historico'
        title='Consultar Historico'
      >
        <HistoryIcon />
      </AdapterRouter>

      <AdapterRouter
        href='/settings'
        className={Estilos.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </AdapterRouter>

      <AdapterRouter
        href='#'
        className={Estilos.menuLink}
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChanging}
      >
        {/* <SunIcon /> */}
        {SetNextTheamIcon[theme]}
      </AdapterRouter>
    </nav>
  );
}

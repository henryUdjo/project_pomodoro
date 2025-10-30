import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const montagem = (
  <StrictMode>
    <App />
  </StrictMode>
);

// const montagem = <App />;

createRoot(document.getElementById('root')!).render(montagem);

{
  /* <StrictMode>
    <App />,
  </StrictMode>, */
}

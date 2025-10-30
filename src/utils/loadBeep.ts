import gravitational from '../assets/audios/src_assets_audios_gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(gravitational);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(error => console.log('Erro de ordem' + error));
  };
}

export function formatSecondsToMinute(seconds: number) {
  const minutos = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondss = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${minutos}:${secondss}`;
}

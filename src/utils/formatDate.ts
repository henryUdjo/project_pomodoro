import { format } from 'date-fns';

export function formatDate(timestampa: number) {
  const data = new Date(timestampa);
  return timestampa ? format(data, 'dd/MM/yyyy HH:mm:ss') : ' - ';
}

import { ru } from 'date-fns/locale';
import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'd MMM yyyy';

  return date ? format(new Date(date), fm, { locale: ru }) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'yyyy dd MMMM p';

  return date ? format(new Date(date), fm, { locale: ru }) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

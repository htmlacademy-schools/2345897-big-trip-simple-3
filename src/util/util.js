import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
export const humanizeDate = (dueDate) => dayjs(dueDate).format('DD MMM');
export const humanizeDateTime = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');
export const humanizeDateTimeForFilters = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

export const updateItem = (points, update) => points.map((point) => point.id === update.id ? update : point);

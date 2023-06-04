import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDate = (dueDate) => dayjs(dueDate).format('DD MMM');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');
const humanizeDateTimeForFilters = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const updateItem = (points, update) => points.map((point) => point.id === update.id ? update : point);

export {getRandomInteger, humanizeTime, humanizeDate, humanizeDateTime, humanizeDateTimeForFilters, updateItem};

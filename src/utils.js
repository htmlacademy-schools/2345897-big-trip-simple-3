import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDate = (dueDate) => dayjs(dueDate).format('DD MMM');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');

export {getRandomInteger, humanizeTime, humanizeDate, humanizeDateTime};

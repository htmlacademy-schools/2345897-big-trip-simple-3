import dayjs from 'dayjs';

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};


const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {return 0;}
  if (dataA === null) {return 1;}
  if (dataB === null) {return -1;}
  return null;
};

const getWeightEvent = (dataA, dataB) => {
  if (dataA > dataB) {return 1;}
  if (dataA < dataB) {return -1;}
  return 0;
};

export const sortPointDay = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.dateFrom, dataB.dateFrom);
  return weight ?? dayjs(dataB.dateFrom).diff(dayjs(dataA.dateFrom));
};

export const sortPointEvent = (dataA, dataB) => getWeightEvent(dataA.type, dataB.type);

export const sortPointTime = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.dateFrom, dataB.dateFrom);
  return weight ?? dayjs(dataB.dateFrom).diff(dayjs(dataA.dateFrom));
};

export const sortPointPrice = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.basePrice, dataB.basePrice);
  return weight ?? dataA.basePrice - dataB.basePrice;
};

export const sortPointOffers = (dataA, dataB) => dataB.offers.length - dataA.offers.length;

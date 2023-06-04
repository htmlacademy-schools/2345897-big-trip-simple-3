import { getRandomInteger } from '../util/util.js';
import { getOffers } from './offers.js';
import { nanoid } from 'nanoid';
import { DESTINATIONS } from './destinations.js';

export const pointTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);
  return pointTypes[randomIndex];
};

export const generateDataPoint = () => {
  const destinationsIds = DESTINATIONS.reduce((acc, item) => [...acc, item.id], []);

  return ({
    basePrice: getRandomInteger(200, 3000),
    dateFrom: new Date(getRandomInteger(2010, 2025), getRandomInteger(0, 12), getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 60)),
    dateTo: new Date(),
    destination: destinationsIds[getRandomInteger(0, destinationsIds.length - 1)],
    id: nanoid(),
    offers: [],
    type: generatePointType(),
  });
};

export const generatePoint = () => {
  const dataPoint = generateDataPoint();
  const dataType = dataPoint.type;
  const getOffersId = getOffers().find((offer) => offer.type === dataType).offers.map((offer) => offer.id);
  dataPoint.offers = getOffersId;
  dataPoint.offers.pop();
  return dataPoint;
};


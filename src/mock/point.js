import { getRandomInteger } from '../util.js';
import { getOffers } from './offers.js';

export const cities = [

  'London',
  'Dubai',
  'Kazan',
  'Los Angeles'
];

const citiesGenerate = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const textFish = () => {

  const text = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
  ];

  const randomIndex = getRandomInteger(0, text.length - 1);

  return text[randomIndex];
};

export const typePoint = [
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

const pointGenerate = () => {

  const randomIndex = getRandomInteger(0, typePoint.length - 1);

  return typePoint[randomIndex];
};
const photoGenerate = () => {
  const photo = [];
  for (let i = 0; i < getRandomInteger(0, 10); i++) {
    photo.push({
      src: `http://picsum.photos/300/200?r=45${getRandomInteger(0, 9)}`,
      description: textFish()
    });
  }
  return photo;
};

const generateDestination = (idValue) => ({
  id: idValue,
  description: textFish(),
  name: citiesGenerate(),
  photo: photoGenerate()
}
);

export const destinations = [];
for (let i = 0; i < 10; i++) {
  destinations.push(generateDestination(i));
}

export const generateDataPoint = () => ({
  basePrice: getRandomInteger(200, 3000),
  dateFrom: new Date(getRandomInteger(2010, 2022), getRandomInteger(0, 12), getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 60)),
  dateTo: new Date(),
  destination: getRandomInteger(0, 9),
  id: '0',
  offers: [],
  type: pointGenerate(),
});

export const generatePoint = () => {
  const dataPoint = generateDataPoint();
  const dataType = dataPoint.type;
  const getOffersId = getOffers().find((offer) => offer.type === dataType).offers.map((offer) => offer.id);
  dataPoint.offers = getOffersId;
  dataPoint.offers.pop();
  return dataPoint;
};

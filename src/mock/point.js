import { getRandomInt } from '../presenter/util';
import { getOffers } from './offers.js';

export const cities = [
  'Kazan',
  'Dubai',
  'London',
  'Los Angeles'
];

const citiGenerate = () => {
  const randomIndex = getRandomInt(0, cities.length - 1);

  return cities[randomIndex];
};

const textFish = () => {

  const describe = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
  ];

  const randomIndex = getRandomInt(0, describe.length - 1);

  return describe[randomIndex];
};

export const pointType = [
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

const pointTypeGenerate = () => {

  const randomIndex = getRandomInt(0, pointType.length - 1);

  return pointType[randomIndex];
};
const photoGenerate = () => {
  const photo = [];
  for (let i = 0; i < getRandomInt(0, 10); i++) {
    photo.push({
      src: `http://picsum.photos/300/200?r=45${getRandomInt(0, 9)}`,
      description: textFish()
    });
  }
  return photo;
};

const destinationGenerate = (idValue) => ({
  id: idValue,
  description: textFish(),
  name: citiGenerate(),
  photo: photoGenerate()
}
);

export const destinations = [];
for (let i = 0; i < 10; i++) {
  destinations.push(destinationGenerate(i));
}

export const dataPointGenerate = () => ({
  basePrice: getRandomInt(200, 3000),
  dateFrom: new Date(getRandomInt(2020, 2023), getRandomInt(0, 12), getRandomInt(0, 31), getRandomInt(0, 24), getRandomInt(0, 60)),
  dateTo: new Date(),
  destination: getRandomInt(0, 9),
  id: '0',
  offers: [],
  type: pointTypeGenerate(),
});

export const pointGenerate = () => {
  const dataPoint = dataPointGenerate();
  const dataType = dataPoint.type;
  const getOffersId = getOffers().find((offer) => offer.type === dataType).offers.map((offer) => offer.id);
  dataPoint.offers = getOffersId;
  dataPoint.offers.pop();
  return dataPoint;
};

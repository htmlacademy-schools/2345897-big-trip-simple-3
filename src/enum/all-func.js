import Enum from './enum.js';

export const ButtonDelete = {
  DEFAULT: 'Delete',
  PRESSED: 'Deleting...',
};

export const ButtonSave = {
  DEFAULT: 'Save',
  PRESSED: 'Saving...',
};

export const FilterLabel = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
};

export const FilterPageEmpty = {
  EVERYTHING: 'Click "Create Event" to add your first point',
  FUTURE: 'There are no future events now',
};

export const FilterPredicate = {
  EVERYTHING: () => true,
  FUTURE: (point) => Date.parse(point.endDate) > Date.now(),
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

export const Mode = {
  VIEW: 0,
  CREATE: 1,
  EDIT: 2,
};

export const PointLabel = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

export const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

export const SortCapSortCompare = {
  DAY: (point, nextPoint) => Date.parse(point.startDate) - Date.parse(nextPoint.startDate),
  PRICE: (point, nextPoint) => nextPoint.basePrice - point.basePrice,
};

export const SortDisabled = {
  DAY: false,
  EVENT: true,
  TIME: true,
  PRICE: false,
  OFFER: true,
};

export const SortLabel = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFER: 'Offer',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const UserCommand = {
  EXIT: ['Escape', 'Esc'],
  NEXT: ['ArrowRight', 'ArrowDown'],
  PREVIOUS: ['ArrowLeft', 'ArrowUp'],
  CONFIRM: ['Enter'],
};

export { Enum }; // Экспорт Enum

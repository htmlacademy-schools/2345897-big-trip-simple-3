const OFFERS = [
  {
    type: 'train',
    offers: [
      { id: 1, title: 'Order a taxi to the train', price: 30 },
      { id: 2, title: 'Order lunch in a compartment', price: 20 },
    ],
  },
  {
    type: 'taxi',
    offers: [
      { id: 1, title: 'Ordering a taxi with a child seat', price: 15 },
      { id: 2, title: 'Possibility to go to an additional place', price: 10 },
    ],
  },
  {
    type: 'bus',
    offers: [
      { id: 1, title: 'Extra seat', price: 10 },
    ],
  },
  {
    type: 'check-in',
    offers: [
      { id: 1, title: 'Extend your stay', price: 20 },
      { id: 2, title: 'Help with luggage', price: 5 },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      { id: 1, title: 'personal guide', price: 40 }
    ],
  },
  {
    type: 'ship',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      { id: 1, title: 'Premium car model', price: 70 },
      { id: 2, title: 'Car color selection', price: 10 },
      { id: 3, title: 'Premium car model2', price: 10 }
    ],
  },
  {
    type: 'restaurant',
    offers: [
      { id: 1, title: 'Fresh fish', price: 20 },
    ],
  },
  {
    type: 'flight',
    offers: [
      { id: 1, title: 'Two extra blankets', price: 4 },
      { id: 2, title: 'Optional lunch', price: 10 },
    ],
  }
];

export const getOffers = () => OFFERS;

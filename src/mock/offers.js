const OFFERS = [
  {
    type: 'train',
    offers: [
      { id: 1, title: 'Book a taxi for the train journey', price: 30 },
      { id: 2, title: 'Order lunch in a train compartment', price: 20 },
    ],
  },
  {
    type: 'taxi',
    offers: [
      { id: 1, title: 'Request a taxi with a child seat', price: 15 },
      { id: 2, title: 'Option to visit an additional place', price: 10 },
    ],
  },
  {
    type: 'bus',
    offers: [
      { id: 1, title: 'Extra seat availability', price: 10 },
    ],
  },
  {
    type: 'check-in',
    offers: [
      { id: 1, title: 'Extend your stay duration', price: 20 },
      { id: 2, title: 'Assistance with luggage', price: 5 },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      { id: 1, title: 'Personalized guided tour', price: 40 }
    ],
  },
  {
    type: 'ship',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      { id: 1, title: 'Premium car selection', price: 70 },
      { id: 2, title: 'Choose car color', price: 10 },
      { id: 3, title: 'Premium car model upgrade', price: 10 }
    ],
  },
  {
    type: 'restaurant',
    offers: [
      { id: 1, title: 'Fresh seafood', price: 20 },
    ],
  },
  {
    type: 'flight',
    offers: [
      { id: 1, title: 'Two additional blankets', price: 4 },
      { id: 2, title: 'Optional in-flight meal', price: 10 },
    ],
  }
];

export const getOffers = () => OFFERS;

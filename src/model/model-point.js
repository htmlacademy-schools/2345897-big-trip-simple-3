import { getOffers } from '../mock/offers.js';
import { generatePoint } from '../mock/point.js';
import { DESTINATIONS } from '../mock/destinations.js';

export default class PointModel {
  #points = Array.from({ length: 3 }, generatePoint);
  offers = getOffers();

  getPoint = (point) => {
    const offerByType = this.offers.find(({ type }) => type === point.type);
    const offers = offerByType.offers.filter(({ id }) => point.offers.includes(id));
    const destination = DESTINATIONS.find(({ id }) => id === point.destination);

    return {...point, offers, destination};
  };

  get points() {
    return this.#points.map((point) => this.getPoint(point));
  }
}

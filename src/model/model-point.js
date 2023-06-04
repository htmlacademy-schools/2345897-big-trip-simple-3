import { getOffers } from '../mock/offers.js';
import { destinations, generatePoint } from '../mock/point.js';

export default class PointModel {
  #points = Array.from({ length: 0 }, generatePoint);
  offers = getOffers();

  getPoint = (point) => {
    const offerByType = this.offers.find(({ type }) => type === point.type);
    const offers = offerByType.offers.filter(({ id }) => point.offers.includes(id));
    const destination = destinations.find(({ id }) => id === point.destination);

    return {
      ...point,
      offers,
      destination
    };
  };

  get points() {
    return this.#points.map((point) => this.getPoint(point));
  }
}

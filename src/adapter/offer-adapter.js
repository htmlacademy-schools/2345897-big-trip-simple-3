import Adapter from './adapter.js';

export default class OfferAdapter extends Adapter {
  /**
   * @param {Offer} data
   */
  constructor(data) {
    super();

    this.id = String(data.id);
    this.title = data.title;
    this.price = data.price;
  }
}

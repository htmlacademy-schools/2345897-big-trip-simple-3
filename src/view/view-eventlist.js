import {createElement} from '../render.js';

const createTripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ViewListTrip {

  getElement() {
    if (!this.element) {
      this.element = createElement(createTripListTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

import { createElement } from '../render';

const createTripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class viewList {

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

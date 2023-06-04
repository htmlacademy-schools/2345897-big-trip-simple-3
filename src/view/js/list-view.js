import View from './view.js';
import PointView from './point-view.js';

export default class ListView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__list');
  }

  /**
   * @param {string} id
   */
  findById(id) {
    return PointView.findById(id, this);
  }

  /**
   * @param {PointState[]} states
   */
  setPoints(states) {
    const views = states.map((state) => new PointView(state));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(ListView), ListView);

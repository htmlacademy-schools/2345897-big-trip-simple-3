import ViewRadioButton, {html} from './view-radio-button.js';

export default class SortView extends ViewRadioButton {
  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>
    `;
  }

  /**
   * @param {SortOptionState} state
   */
  createOptionTemplate(state) {
    const [label, value] = state;

    return html`
      <div class="trip-sort__item trip-sort__item--${value}">
        <input
          id="sort-${value}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="${value}"
        >
        <label class="trip-sort__btn" for="sort-${value}">
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {SortOptionState[]} states
   */
  setOptions(states) {
    const templates = states.map(this.createOptionTemplate);

    this.querySelector('form').innerHTML = templates.join('');

    return this;
  }
}

customElements.define(String(SortView), SortView);

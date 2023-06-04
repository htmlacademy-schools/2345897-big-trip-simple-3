import ViewRadioButton, {html} from './view-radio-button.js';

export default class FilterView extends ViewRadioButton {
  /**
   * @override
   */
  createTemplate() {
    return html`
    <form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
  }

  /**
   * @param {FilterOptionState} state
   */
  createOptionTemplate(state) {
    const [label, value] = state;

    return html`
      <div class="trip-filters__filter">
        <input
          id="filter-${value}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${value}"
        >
        <label
          class="trip-filters__filter-label"
          for="filter-${value}"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {FilterOptionState[]} states
   */
  setOptions(states) {
    const templates = states.map(this.createOptionTemplate);

    this.querySelector('.trip-filters')
      .insertAdjacentHTML('afterbegin', templates.join(''));

    return this;
  }
}

customElements.define(String(FilterView), FilterView);

import View from './view.js';

export * from './view.js';

export default class ViewRadioButton extends View {
  get inputSelector() {
    return '[type="radio"]';
  }

  /**
   * @type {NodeListOf<HTMLInputElement>}
   */
  get inputViews() {
    return this.querySelectorAll(this.inputSelector);
  }

  getValue() {
    /** @type {HTMLInputElement} */
    const inputCheckedView = this.querySelector(`${this.inputSelector}:checked`);

    if (inputCheckedView) {
      return inputCheckedView.value;
    }

    return '';
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    /** @type {HTMLInputElement} */
    const inputView = this.querySelector(`${this.inputSelector}[value="${value}"]`);

    if (inputView) {
      inputView.checked = true;
    }

    return this;
  }

  getIndex() {
    return [...this.inputViews].findIndex((view) => view.checked);
  }

  /**
   * @param {number} index
   */
  setIndex(index, notify = true) {
    const views = this.inputViews;
    const rangeIndex = (views.length + index) % views.length;

    views.item(rangeIndex).checked = true;

    if (notify) {
      views.item(rangeIndex).dispatchEvent(new Event('change', {bubbles: true}));
    }

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    this.inputViews.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}

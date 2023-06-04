import { ButtonDelete } from '../../enum/all-func';
import { ButtonSave } from '../../enum/all-func';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import ManagingDateSelectionForm from './managing-date-selection-form.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DisplayingInformationDestination from './displaying-information-destination.js';
import LoaderView from './loader-view.js';
import {UserCommand} from '../../enum/all-func';

import View, { html } from './view.js';

export default class ViewEditor extends View {
  constructor() {
    super();

    /** @type {PointTypeSelectView} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {ManagingDateSelectionForm} */
    this.ManagingDateSelectionForm = this.querySelector(String(ManagingDateSelectionForm));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DisplayingInformationDestination} */
    this.DisplayingInformationDestination = this.querySelector(String(DisplayingInformationDestination));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {Element} */
    this.targetView = null;

    this.loaderView = new LoaderView();

    this.formView = this.querySelector('form');

    this.classList.add('trip-events__item', 'trip-events__item--reveal-alternate');
    this.addEventListener('click', this.onClick);
  }


  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelectView}
          ${DestinationSelectView}
          ${ManagingDateSelectionForm}
          ${PriceInputView}
          ${this.createButtonsTemplate()}
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DisplayingInformationDestination}
        </section>
      </form>
    `;
  }


  /**
   * @param {boolean} flag
   */
  setLoading(flag) {
    this.loaderView.display(flag);

    [...this.formView].forEach((/** @type {HTMLInputElement} */ inputView) => {
      inputView.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSaving(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__save-btn');

    buttonView.textContent = flag ? ButtonSave.PRESSED : ButtonSave.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  open() {
    this.display(true);

    document.addEventListener('keydown', this);

    return this;
  }

  close(notify = true) {
    this.ManagingDateSelectionForm.close();

    this.display(false);

    document.removeEventListener('keydown', this);

    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (UserCommand.EXIT.includes(event.key)) {
      this.close();
    }
  }

  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${ButtonSave.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${ButtonDelete.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;

    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');

    buttonView.textContent = flag ? ButtonDelete.PRESSED : ButtonDelete.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(ViewEditor), ViewEditor);

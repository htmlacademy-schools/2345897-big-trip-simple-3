import '../loader-view.css';
import View from './view.js';

/**
 * @implements {EventListenerObject}
 */
export default class LoaderView extends View {
  constructor() {
    super(...arguments);

    this.ownerView = document.body;

    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.ownerView[flag ? 'append' : 'removeChild'](this);

    return this;
  }

  connectCallback() {
    this.ownerView.addEventListener('keydown', this);
  }

  disconnectCallback() {
    this.ownerView.removeEventListener('keydown', this);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define(String(LoaderView), LoaderView);

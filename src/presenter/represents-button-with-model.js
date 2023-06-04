import {Mode} from '.././enum/all-func.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLButtonElement} View
 * @extends {Presenter<Model,View>}
 */
export default class RepresentsButtonWithModel extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.view.addEventListener('click', this.onViewClick.bind(this));
    this.model.addEventListener('mode', this.onModelMode.bind(this));
  }

  onViewClick() {
    this.model.setMode(Mode.CREATE);
  }

  onModelMode() {
    this.view.disabled = (this.model.getMode() === Mode.CREATE);
  }
}

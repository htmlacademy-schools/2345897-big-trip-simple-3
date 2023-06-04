import {FilterPageEmpty} from '.././enum/all-func.js';
import {FilterPredicate} from '.././enum/all-func.js';
import {Mode} from '.././enum/all-func.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLParagraphElement} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderDisplay extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.updateView();

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update', 'filter'],
      this.onPointsModelChange.bind(this)
    );

    this.model.addEventListener('mode', this.onModelMode.bind(this));
  }

  updateView() {
    const {length} = this.model.pointsModel.list();
    const key = Object.keys(FilterPredicate).find((k) => FilterPredicate[k] === this.model.pointsModel.getFilter());
    //Object.keys(FilterPredicate).find((key) => FilterPredicate[key] === this.model.pointsModel.getFilter());
    const isHidden = Boolean(length) || this.model.getMode() === Mode.CREATE;

    this.view.textContent = isHidden ? '' : FilterPageEmpty[key];
    this.view.hidden = isHidden;
  }

  onPointsModelChange() {
    this.updateView();
  }

  onModelMode() {
    this.updateView();
  }
}

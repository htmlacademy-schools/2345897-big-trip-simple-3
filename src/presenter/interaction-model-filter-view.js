import { Mode } from '../enum/all-func.js';
import { FilterType } from '../enum/all-func.js';
import { FilterLabel } from '../enum/all-func.js';
import { FilterPredicate } from '../enum/all-func.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class InteractionModelFilterView extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));
    this.model.addEventListener('mode', this.onModelMode.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update'],
      this.onPointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {FilterOptionState[]} */
    const options = Object.keys(FilterType).map(
      (key) => [FilterLabel[key], FilterType[key]]
    );

    this.view.setOptions(options);
    this.updateViewOptionsDisabled();
    this.updateViewValue();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = Object.keys(FilterPredicate).find((key) => FilterPredicate[key] === predicate);
    //Object.keys(FilterPredicate).find((key) => FilterPredicate[key] === predicate);
    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(FilterPredicate);
    const states = predicates.map((predicate) =>
      !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(states);
  }

  onViewChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[Object.keys(FilterType).find((key) => FilterType[key] === value)];
    //Object.keys(FilterType).find((key) => FilterType[key] === value);
    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setFilter(predicate);
  }


  onPointsModelChange() {
    this.updateViewOptionsDisabled();
  }

  onModelMode() {
    if (this.model.getMode() === Mode.CREATE) {
      this.model.pointsModel.setFilter(FilterPredicate.EVERYTHING);

      this.updateViewValue();
    }
  }
}

import { SortType } from '.././enum/all-func.js';
import { SortLabel } from '.././enum/all-func.js';
import { SortDisabled } from '.././enum/all-func.js';
import Presenter from './presenter.js';
import { SortCapSortCompare } from '.././enum/all-func.js';
import { Mode } from '.././enum/all-func.js';

/**
 * @template {ApplicationModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class ManagingDataSortingSortingView extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'filter'],
      this.onPointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {SortOptionState[]} */
    const options = Object.keys(SortType).map(
      (key) => [SortLabel[key], SortType[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(Object.values(SortDisabled));

    this.updateViewValue();
    this.updateViewDisplay();
  }

  updateViewValue() {
    const compare = this.model.pointsModel.getSort();
    const type = Object.keys(SortCapSortCompare).find((key) => SortCapSortCompare[key] === compare);
    //Object.keys(SortCapSortCompare).find((key) => SortCapSortCompare[key] === compare);

    this.view.setValue(type);
  }

  updateViewDisplay() {
    const { length } = this.model.pointsModel.list();

    this.view.display(Boolean(length));
  }

  onViewChange() {
    const value = this.view.getValue();
    const compare = Object.keys(SortType).find((key) => SortType[key] === value);
    //Object.keys(SortType).find((key) => SortType[key] === value);
    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setSort(this[compare]);
  }


  /**
   * @param {CustomEvent} event
   */
  onPointsModelChange(event) {
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(SortCapSortCompare.DAY, false);

      this.updateViewValue();
    }

    this.updateViewDisplay();
  }
}

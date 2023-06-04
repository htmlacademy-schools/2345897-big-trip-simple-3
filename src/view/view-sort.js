import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../util/module-sort.js';

const oneSortElement = (sortTypeItem, checkedInner = '') => (
  `
    <div class="trip-sort__item  trip-sort__item--${sortTypeItem}">
      <input id="sort-${sortTypeItem}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortTypeItem}" ${checkedInner}>
      <label class="trip-sort__btn" for="sort-${sortTypeItem}" data-sort-type="${sortTypeItem}">${sortTypeItem}</label>
    </div>
  `
);

const createSortTemplate = () => (
  `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${oneSortElement(SortType.DAY, 'checked')}
      ${oneSortElement(SortType.EVENT)}
      ${oneSortElement(SortType.TIME)}
      ${oneSortElement(SortType.PRICE)}
      ${oneSortElement(SortType.OFFERS)}
    </form>
  `
);

export default class ViewSort extends AbstractView{
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    evt.target.parentNode.firstElementChild.checked = true;
  };
}

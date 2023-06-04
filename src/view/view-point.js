import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, humanizeTime, humanizeDateTimeForFilters } from '../util/util.js';

const createOfferTemplate = ({ title, price }) => (`
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`);

const createOffersTemplate = (offers) => offers.length ? offers.map(createOfferTemplate).join('') : '';

const createPointsTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;
  const offersTemplate = createOffersTemplate(offers);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${humanizeDateTimeForFilters(dateFrom)}>${humanizeDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${humanizeTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${humanizeTime(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

export default class ViewPoin extends AbstractView {
  constructor(point) {
    super();
    this.point = point;
  }

  get template() {
    return createPointsTemplate(this.point);
  }

  setPointClickHandler = (callback) => {
    this._callback.pointClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointClickHandler);
  };

  #pointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointClick();
  };
}

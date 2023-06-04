import { humanizeDateTime } from '../util.js';
import { cities } from '../mock/point.js';
import { getOffers } from '../mock/offers.js';
import { pointType } from '../mock/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const BLANK_POINT = {
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  destination: {
    id: null,
    description: null,
    name: null,
    pictures: null
  },
  id: null,
  offers: [],
  type: null,
};

const offerTemplate = (id, title, price, checked) => (
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${checked}>

    <label class="event__offer-label" for="event-offer-${title}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
  `
);

const getAllOffersId = (type) => {
  if (!type) {return '';}

  const listOfAllOffers = getOffers().find((offer) => offer.type === type).offers;
  const finalListOfOffers = listOfAllOffers.length ? listOfAllOffers.map((offer) => offerTemplate(offer.id, offer.title, offer.price)) : listOfAllOffers;
  return finalListOfOffers.join('');
};


const offersTemplateContainer = (allOffers) => {
  if (!allOffers) {return '';}

  return (
    `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${allOffers}
        </div>
      </section>
    `
  );
};

const iconsTypesMarking = (typeInner, checked) => (
  `
    <div class="event__type-item">
      <input id="event-type-${typeInner}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInner}" ${checked}>
      <label class="event__type-label  event__type-label--${typeInner}" for="event-type-${typeInner}-1">${typeInner}</label>
    </div>
  `
);

const iconsTypesChecked = (typeInner) => {
  if (!typeInner) {return '';}

  const iconsListMarking = [];
  let checked = '';
  for (let i = 0; i < pointType.length; i++) {
    checked = typeInner === pointType[i] ? 'checked' : '';
    iconsListMarking.push(iconsTypesMarking(pointType[i], checked));
  }
  return iconsListMarking.join('');
};

const createPictureTemplate = (pictures) => (`
  <img class="event__photo" src="${pictures.src}" alt="Event photo">
`);
const createPicturesTemplate = (destination) => destination.pictures.length ? destination.pictures.map(createPictureTemplate).join('') : '';

const createCityTemplate = (city) => (`
    <option value="${city}"></option>
`);
const createCitiesTemplate = (city) => city.length ? city.map(createCityTemplate).join('') : '';

const createNewPointTemplate = (point) => {
  const {dateFrom, dateTo, destination, offers, type} = point;

  const allOffersByType = getAllOffersId(type, offers);
  const offersContainer = offersTemplateContainer(allOffersByType);
  const picturesTemplate = destination.pictures ? createPicturesTemplate(destination) : '';
  const iconsTyped = iconsTypesChecked(type);
  const citiesTemplate = createCitiesTemplate(cities);
  const humanizedDateFrom = dateFrom ? humanizeDateTime(dateFrom) : '';
  const humanizedDateTo = dateTo ? humanizeDateTime(dateTo) : '';
  const destinationName = destination.name ? destination.name : '';
  const destinationDescription = destination.description ? destination.description : '';
  const eventType = type ? type : '';

  return (`
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${iconsTyped}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${eventType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${citiesTemplate}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizedDateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizedDateTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
  ${offersContainer}

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>

  </section>
</form>
</li>
`);
};

export default class ViewNewPoint extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this.point = point;
  }

  get template() {
    return createNewPointTemplate(this.point);
  }
}

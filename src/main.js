
import {FilterPredicate} from './enum/all-func';
import {SortCapSortCompare} from './enum/all-func';

import Store from './store/store.js';

import CollectionModel from './model/collection-model.js';
import DataTableModel from './model/data-table-model.js';
import ApplicationModel from './model/model-application.js';

import PointAdapter from './adapter/point-adapter.js';
import RepresentsAdapterConvertingObjectDataDestination from './adapter/represents-adapter-converting-object-data-destination.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';

import FilterView from './view/js/filter-view.js';
import SortView from './view/js/view-sort.js';
import ListView from './view/js/list-view.js';
import DisplayingManagingElementCreationForm from './view/js/displaying-managing-element-creation-form.js';
import ViewEditor from './view/js/view-editor.js';

import InteractionModelFilterView from './presenter/interaction-model-filter-view.js';
import ManagingDataSortingSortingView from './presenter/managing-data-sorting-sorting-view.js';
import ManagingListPointsDisplay from './presenter/managing-list-points-display.js';
import InteractionModelViewEditor from './presenter/interaction-model-editor-view.js';
import PlaceholderDisplay from './presenter/placeholder-display.js';
import RepresentsButtonWithModel from './presenter/represents-button-with-model.js';
import InteractionApplicationModel from './presenter/interaction-application-model.js';


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic bo1580bdzbgg';

/** @type {Store<Point>} */
const pointsStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>} */
const destinationsStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>} */
const offerGroupsStore = new Store(OFFERS_URL, AUTH);


const pointsModel = new DataTableModel(pointsStore, (item) => new PointAdapter(item))
  .setFilter(FilterPredicate.EVERYTHING)
  .setSort(SortCapSortCompare.DAY);

const destinationsModel = new CollectionModel(destinationsStore, (item) => new RepresentsAdapterConvertingObjectDataDestination(item));

const offerGroupsModel = new CollectionModel(offerGroupsStore, (item) => new OfferGroupAdapter(item));

const applicationModel = new ApplicationModel(pointsModel, destinationsModel, offerGroupsModel);


/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {ListView} */
const listView = document.querySelector(String(ListView));

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));


applicationModel.ready().then(() => {
  new InteractionModelFilterView(applicationModel, filterView);
  new ManagingDataSortingSortingView(applicationModel, sortView);
  new ManagingListPointsDisplay(applicationModel, listView);
  new InteractionModelViewEditor(applicationModel, new ViewEditor());
  new InteractionApplicationModel(applicationModel, new DisplayingManagingElementCreationForm().target(listView));
  new PlaceholderDisplay(applicationModel, placeholderView);
  new RepresentsButtonWithModel(applicationModel, createButtonView);

}).catch((exception) => {
  placeholderView.textContent = exception;
});

import FiltersView from './view/view-filter.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/model-point.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();
const pointsModel = new PointModel();

render(new FiltersView(), tripControlsFilters);
boardPresenter.init(tripEventsSection, pointsModel);

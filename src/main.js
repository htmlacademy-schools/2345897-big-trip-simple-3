import FiltersList from './view/filter-list.js';
import {render} from './framework/render.js';
import BoardPresenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel();

render(new FiltersList(), tripControlsFilters);

const boardPresenter = new BoardPresenter(tripEventsSection, pointsModel);
boardPresenter.init();

import ViewFilter from './view/view-filter.js';
import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import ModelPoint from './model/model-point.js';
import {generateFilter} from './util/filter.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointsModel = new ModelPoint();

const filters = generateFilter(pointsModel.points);

render(new ViewFilter(filters), tripControlsFilters);

const boardPresenter = new BoardPresenter(tripEventsSection, pointsModel);
boardPresenter.init();

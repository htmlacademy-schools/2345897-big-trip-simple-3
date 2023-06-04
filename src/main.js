import ViewFilters from './view/view-filter.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import ModelPoint from './model/model-point.js';

const SecrionEvent = document.querySelector('.trip-events');
const FiltrControls = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();

const Modelpoint = new ModelPoint();

render(new ViewFilters(), FiltrControls);
boardPresenter.init(SecrionEvent, Modelpoint);

import { render } from '../framework/render.js';
import ViewSort from '../view/view-sort.js';
import ViewList from '../view/view-eventlist.js';
import ViewEmpty from '../view/view-listempty.js';
import PointPresenter from './presenter-point.js';
import { updateItem } from '../util.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #sortComponent = new ViewSort();
  #ViewEmptyComponent = new ViewEmpty();
  #eventsList = new ViewList();
  #pointPresenter = new Map();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = this.#pointsModel.points;
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => render(this.#sortComponent, this.#boardContainer);

  #renderViewEmpty = () => render(this.#ViewEmptyComponent, this.#eventsList.element);

  #renderEventList = () => render(this.#eventsList, this.#boardContainer);

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderBoardPoints = () => this.#boardPoints.length ? this.#boardPoints.forEach((point) => this.#renderPoint(point)) : this.#renderViewEmpty();

  // #renderNewPoint = () => render(new ViewNewPoint(this.#boardPoints[1]), this.#eventsList.element);

  #renderBoard = () => {
    this.#renderSort();
    this.#renderEventList();
    this.#renderBoardPoints();
  };
}

import ViewPoint from '../view/view-point.js';
import ViewEditPoint from '../view/view-editpoint.js';
import { remove, render, replace } from '../framework/render.js';

const mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointsContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #changeData = null;

  #mode = mode.DEFAULT;
  #changeMode = null;

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new ViewPoint(point);
    this.#editPointComponent = new ViewEditPoint(point);

    this.#pointComponent.setPointClickHandler(() => {
      this.#replacePointToEditForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#editPointComponent.setEditClickHandler(() => this.#replaceEditFormToPoint());

    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === mode.DEFAULT){
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === mode.EDITING){
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = mode.DEFAULT;
  };

  #replacePointToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#changeMode();
    this.#mode = mode.EDITING;
  };

  #handleFormSubmit = (pointInner) => {
    this.#changeData(pointInner);
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}

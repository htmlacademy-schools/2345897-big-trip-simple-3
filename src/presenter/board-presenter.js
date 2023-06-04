import { render } from '../render.js';
import viewPoint from '../view/view-point.js';
import viewSort from '../view/view-sort.js';
import viewList from '../view/view-eventlist.js';

import viewEditPoint from '../view/edit-pointview.js';
import viewNul from '../view/view-list.js';

export default class BoardPresenter {
  eventsList = new viewList();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = this.pointsModel.points;

    render(new viewSort(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    if (this.boardPoints.every((point) => point.isArchive)) {
      render(new viewNul(), this.eventsList.element);
    } else {
      for (let i = 0; i < this.boardPoints.length; i++) {
        this.#renderPoint(this.boardPoints[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new viewPoint(point);
    const editPointComponent = new viewEditPoint(point);

    const replaceEditFormToPoint = () => {
      this.eventsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const replacePointToEditForm = () => {
      this.eventsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefaul();
      replaceEditFormToPoint();
    });

    render(pointComponent, this.eventsList.element);
  };
}

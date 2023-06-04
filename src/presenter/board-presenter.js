import { render } from '../render.js';
import viewPoints from '../view/view-point.js';
import viewSort from '../view/view-sort.js';
import viewList from '../view/view-eventlist.js';
import viewNewPoint from '../view/view-newpoint.js';
import viewEditPoint from '../view/edit-pointview.js';

export default class BoardPresenter {
  eventsList = new viewList();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = this.pointsModel.points;

    render(new viewSort(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new viewNewPoint(this.boardPoints[1]), this.eventsList.element);

    for (let i = 0; i < this.boardPoints.length; i++) {
      this.#renderPoint(this.boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new viewPoints(point);
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

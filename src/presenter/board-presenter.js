import { render } from '../render';
import viewPoints from '../view/view-point.js';
import viewSort from '../view/view-sort.js';
import viewList from '../view/view-eventlist.js';
import NewPointView from '../view/view-newpoint.js';
import viewEditPoint from '../view/edit-pointview.js';

export default class BoardPresenter {
  eventsList = new viewList();

  init = (container, pointsModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.boardPoints = this.pointsModel.getPoints();

    render(new viewSort(), this.container);
    render(this.eventsList, this.container);
    render(new NewPointView(this.boardPoints[1]), this.eventsList.getElement());
    render(new viewEditPoint(this.boardPoints[0]), this.eventsList.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new viewPoints(this.boardPoints[i]), this.eventsList.getElement());
    }
  };
}

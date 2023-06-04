import {render} from './render.js';
import ViewPoint from './view/view-point.js';
import ViewSort from './view/view-sort.js';
import ViewListTrip from './view/view-eventlist.js';
import ViewNewPoint from './view/view-newpoint.js';
import ViewEditPoint from './view/edit-pointview.js';

export default class BoardPresenter {
  eventsList = new ViewListTrip();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new ViewSort(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new ViewEditPoint, this.eventsList.getElement());
    render(new ViewNewPoint(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ViewPoint(), this.eventsList.getElement());
    }
  };
}

import Adapter from './adapter.js';

export default class RepresentsAdapterConvertingObjectDataDestination extends Adapter {
  /**
   * @param {Destination} destination
   */
  constructor(destination) {
    super();

    this.id = String(destination.id);
    this.description = destination.description;
    this.name = destination.name;
    this.pictures = destination.pictures.map((picture) => ({...picture}));
  }
}

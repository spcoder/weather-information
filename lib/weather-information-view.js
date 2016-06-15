'use babel';

import RightNowView from './right-now-view.js';

export default class WeatherInformationView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('WeatherInformation');

    this.rightNowElement = document.createElement('right-now');
    this.element.appendChild(this.rightNowElement);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  updateForecast(forecast) {
    this.rightNowElement.updateForecast(forecast);
  }

  getElement() {
    return this.element;
  }

}

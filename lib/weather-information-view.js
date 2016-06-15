'use babel';

import RightNowElement from './right-now-element';
import NextHourElement from './next-hour-element';
import NextTwentyFourElement from './next-twenty-four-element';
import NextSevenDaysElement from './next-seven-days-element';

export default class WeatherInformationView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('WeatherInformation');

    this.rightNowElement = document.createElement('right-now');
    this.element.appendChild(this.rightNowElement);

    this.nextHourElement = document.createElement('next-hour');
    this.element.appendChild(this.nextHourElement);

    this.nextTwentyFourElement = document.createElement('next-twenty-four');
    this.element.appendChild(this.nextTwentyFourElement);

    this.nextSevenDaysElement = document.createElement('next-seven-days');
    this.element.appendChild(this.nextSevenDaysElement);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  updateForecast(forecast) {
    this.rightNowElement.updateForecast(forecast);
    this.nextHourElement.updateForecast(forecast);
    this.nextTwentyFourElement.updateForecast(forecast);
    this.nextSevenDaysElement.updateForecast(forecast);
  }

  getElement() {
    return this.element;
  }

}

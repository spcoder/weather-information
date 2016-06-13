'use babel';

export default class WeatherInformationView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('WeatherInformation');

    this.element.appendChild(this.rightNowElement());
  }

  rightNowElement() {
    let root = document.createElement('div');
    root.classList.add('RightNow');

    let h1 = document.createElement('h1');
    h1.textContent = 'RIGHT NOW';
    root.appendChild(h1);

    let body = document.createElement('div');
    body.classList.add('body');
    root.appendChild(body);

    let icon = document.createElement('i');
    icon.classList.add('wi');
    icon.classList.add('wi-night-sleet');
    body.appendChild(icon);

    this.temp = document.createElement('h1');
    this.temp.innerHTML = '--&deg;';
    body.appendChild(this.temp);

    return root;
  }

  weatherClassFromIcon(forecastIcon) {
    switch(forecastIcon) {
      case clear-day:
        return 'wi-day-sunny';
      case clear-night:
        return 'wi-night-clear';
      case rain:
        return 'wi-rain';
      case snow:
        return 'wi-snow';
      case sleet:
        return 'wi-sleet';
      case wind:
        return 'wi-strong-wind';
      case fog:
        return 'wi-fog';
      case cloudy:
        return 'wi-cloudy';
      case partly-cloudy-day:
        return 'wi-day-cloudy';
      case partly-cloudy-night:
        return 'wi-night-alt-cloudy';
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  updateForecast(forecast) {
    this.temp.innerHTML = Math.round(forecast.currently.temperature) + '&deg;';
  }

  getElement() {
    return this.element;
  }

}

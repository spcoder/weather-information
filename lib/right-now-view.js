'use babel';

export default class RightNowView extends HTMLElement {

  createdCallback() {
    this.innerHTML = `
      <div class="RightNow">
        <h1>Right Now</h1>
        <main>
          <i class="wi wi-na"></i>
          <h1>&macr;&macr;&deg;</h1>
        </main>
        <footer>
          <span class="summary">&ndash;</span>
          <span>//</span>
          <span class="feels-like">&ndash;</span>
        </footer>
      </div>
    `;
  }

  updateForecast(forecast) {
    const icon = this.querySelector('main > i');
    icon.classList.remove('wi-na');
    icon.classList.add(this.weatherClassFromIcon(forecast.currently.icon));

    this.querySelector('main > h1').innerHTML = Math.round(forecast.currently.temperature) + '&deg;';
    this.querySelector('footer > .summary').textContent = forecast.currently.summary;
    this.querySelector('footer > .feels-like').innerHTML = `Feels like ${Math.round(forecast.currently.apparentTemperature)}&deg;`;
  }

  weatherClassFromIcon(forecastIcon) {
    switch(forecastIcon) {
      case 'clear-day':
        return 'wi-day-sunny';
      case 'clear-night':
        return 'wi-night-clear';
      case 'rain':
        return 'wi-rain';
      case 'snow':
        return 'wi-snow';
      case 'sleet':
        return 'wi-sleet';
      case 'wind':
        return 'wi-strong-wind';
      case 'fog':
        return 'wi-fog';
      case 'cloudy':
        return 'wi-cloudy';
      case 'partly-cloudy-day':
        return 'wi-day-cloudy';
      case 'partly-cloudy-night':
        return 'wi-night-alt-cloudy';
    }
  }

}

document.registerElement('right-now', RightNowView);

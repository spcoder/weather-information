'use babel';

export default class NextHourElement extends HTMLElement {

  createdCallback() {
    this.innerHTML = `
      <div class="NextHour">
        <h1>Next Hour</h1>
        <p>&macr;&macr;</p>
      </div>
    `;
  }

  updateForecast(forecast) {
    this.querySelector('p').textContent = forecast.minutely.summary;
  }

}

document.registerElement('next-hour', NextHourElement);

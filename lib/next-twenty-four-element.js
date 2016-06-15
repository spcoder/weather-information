'use babel';

export default class NextTwentyFourElement extends HTMLElement {

  createdCallback() {
    this.innerHTML = `
      <div class="NextTwentyFour">
        <h1>Next 24 Hours</h1>
        <p>&macr;&macr;</p>
      </div>
    `;
  }

  updateForecast(forecast) {
    this.querySelector('p').textContent = forecast.hourly.summary;
  }

}

document.registerElement('next-twenty-four', NextTwentyFourElement);

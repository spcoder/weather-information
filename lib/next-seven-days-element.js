'use babel';

export default class NextSevenDaysElement extends HTMLElement {

  createdCallback() {
    this.innerHTML = `
      <div class="NextSevenDays">
        <h1>Next 7 Days</h1>
        <p>&macr;&macr;</p>
      </div>
    `;
  }

  updateForecast(forecast) {
    this.querySelector('p').textContent = forecast.daily.summary;
  }

}

document.registerElement('next-seven-days', NextSevenDaysElement);

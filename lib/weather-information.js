'use babel';

var request = require('request');
var moment = require('moment');

import WeatherInformationView from './weather-information-view';
import { CompositeDisposable } from 'atom';

export default {

  weatherInformationView: null,
  rightPanel: null,
  subscriptions: null,

  config: {
    weatherAPIKey: {
      title: 'The Dark Sky Forecast API Key',
      description: 'Visit [https://developer.forecast.io](https://developer.forecast.io) to get your API key.',
      type: 'string',
      default: '',
      order: 1
    },
    latitude: {
      title: 'Latitude',
      description: 'The latitude for your weather information. You can look it up at [http://www.latlong.net](http://www.latlong.net).',
      type: 'number',
      default: 38.627003,
      order: 2
    },
    longitude: {
      title: 'Longitude',
      description: 'The longitude for your weather information. You can look it up at [http://www.latlong.net](http://www.latlong.net).',
      type: 'number',
      default: -90.199404,
      order: 3
    },
    units: {
      title: 'Units',
      description: 'Determines the units for the temperature readings. Reference: [https://developer.forecast.io/docs/v2](https://developer.forecast.io/docs/v2)',
      type: 'string',
      enum: ['auto', 'us', 'si', 'ca', 'uk2'],
      default: 'auto',
      order: 4
    },
    language: {
      title: 'Language',
      description: 'The language used for summaries. Reference: [https://developer.forecast.io/docs/v2](https://developer.forecast.io/docs/v2)',
      type: 'string',
      enum: ['ar', 'be', 'bs', 'cs', 'de', 'el', 'en', 'es', 'fr', 'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl', 'pl', 'pt', 'ru', 'sk', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin', 'zh', 'zh-tw'],
      default: 'en',
      order: 5
    },
    forecastLink: {
      title: 'Forecast Link',
      description: 'You can include a link to your favorite weather site\'s forecast for your area here.',
      type: 'string',
      default: 'http://forecast.io/#/f/38.627003,-90.199404',
      order: 6
    },
    radarLink: {
      title: 'Radar Link',
      description: 'You can also include a link to the radar for your area.',
      type: 'string',
      default: 'http://forecast.io/#/f/38.627003,-90.199404',
      order: 7
    }
  },

  activate(state) {
    console.info('weather-information:activate');
    this.weatherInformationView = new WeatherInformationView(state.weatherInformationViewState);
    this.rightPanel = atom.workspace.addRightPanel({ item: this.weatherInformationView.getElement(), visible: false });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'weather-information:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    console.info('weather-information:deactivate');
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.weatherInformationView.destroy();
  },

  serialize() {
    console.info('weather-information:serialize');
    return {
      weatherInformationViewState: this.weatherInformationView.serialize()
    };
  },

  toggle() {
    console.info('weather-information:toggle');

    let apiKey = atom.config.get('weather-information.weatherAPIKey');
    let lat = atom.config.get('weather-information.latitude');
    let long = atom.config.get('weather-information.longitude');
    let units = atom.config.get('weather-information.units');
    let lang = atom.config.get('weather-information.language');
    let url = `https://api.forecast.io/forecast/${apiKey}/${lat},${long}?units=${units}&lang=${lang}`;

    request(url, (err, resp, body) => {
      if (err) throw err;
      var forecast = JSON.parse(body);
      console.dir(forecast);
      let forecastLink = atom.config.get('weather-information.forecastLink');
      let radarLink = atom.config.get('weather-information.radarLink');
      this.weatherInformationView.updateForecast(forecast, forecastLink, radarLink);
      // console.log(moment(forecast.currently.time * 1000).format("MM/DD/YYYY h:mm:ss A"));
    });

    return (this.rightPanel.isVisible() ? this.rightPanel.hide() : this.rightPanel.show());
  }

};

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
      default: ''
    },
    latitude: {
      title: 'Latitude',
      description: 'The latitude for your weather information. You can look it up at [http://www.latlong.net](http://www.latlong.net).',
      type: 'number',
      default: 38.627003
    },
    longitude: {
      title: 'Longitude',
      description: 'The longitude for your weather information. You can look it up at [http://www.latlong.net](http://www.latlong.net).',
      type: 'number',
      default: -90.199404
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
    let url = `https://api.forecast.io/forecast/${apiKey}/${lat},${long}`;

    request(url, (err, resp, body) => {
      if (err) throw err;
      var forecast = JSON.parse(body);
      console.dir(forecast);
      this.weatherInformationView.updateForecast(forecast);
      // console.log(forecast.currently.summary, forecast.currently.temperature, forecast.currently.icon);
      // console.log(moment(forecast.currently.time * 1000).format("MM/DD/YYYY h:mm:ss A"));
    });

    console.log('rightPanel', this.rightPanel.isVisible());
    return (this.rightPanel.isVisible() ? this.rightPanel.hide() : this.rightPanel.show());
  }

};

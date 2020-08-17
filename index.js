const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const fetch = require('node-fetch');
const forecastURL = 'https://api.weather.gov/gridpoints/LOT/75,72/forecast';
const windwaveURL = 'https://api.weather.gov/gridpoints/LOT/75,72';

function generateReadMe(INPUT_DATA) {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), INPUT_DATA);
    fs.writeFileSync('README.md', output);
  });
}

fetch(forecastURL, { method: 'Get' })
  .then((res) => res.json())
  .then((json) => {
    // do something with JSON
    const forecasts = json['properties']['periods'];
    fetch(windwaveURL, { method: 'Get' })
      .then((res) => res.json())
      .then((json) => {
        // do something with JSON
        const wavewind = json['properties']['periods'];
        let DATA = {
          name: 'Pat',
          date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          }),
          forecasts: forecasts,
          today_wave: '2-4',
          today_wind: '5-8',
          tomorrow_wind: '1-555',
          tomorrow_wave: '5-10',
        };
        generateReadMe(DATA);
      });
  });

const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const fetch = require('node-fetch');
const forecastURL = 'https://api.weather.gov/gridpoints/LOT/75,72/forecast';

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
    let DATA = {
      name: 'Pat',
      forecasts: json['properties']['periods'].slice(0, 4),
    };
    generateReadMe(DATA);
  });

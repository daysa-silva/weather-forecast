var express = require('express');
var router = express.Router();
const request = require('request')
require('dotenv').config();

const API_KEY_GEO = process.env.API_KEY_GEO
const API_KEY_WEATHER = process.env.API_KEY_WEATHER;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather Forecast App' });
});
/* POST search */
router.post('/search', (req, res, next) => {
  const addressURI = encodeURI(req.body.location);
  const cat = req.body.cat;

  const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=${API_KEY_GEO}&limit=1`
  
  request({url: urlGeo, json: true}, (error, response) => {
    if (error) {
      res.locals.message = 'Unable to connect to gecoding service!';
      res.locals.error = error
      res.render('error')
    } else if(response.body.message || response.body.features.length === 0) {
      res.locals.message = 'Unable to find a place! Try another search.';
      res.locals.error = response.body.message || ''
      res.render('error')
    } else {
        const dataLocation = response.body.features[0];

        const lat = dataLocation.center[1]
        const long = dataLocation.center[0]

        const urlWeather = `http://api.weatherstack.com/current?access_key=${API_KEY_WEATHER}&query=${lat},${long}`;
        
        request({url: urlWeather, json: true}, (error, response) => {
          if (error) {
            res.locals.message = 'Unable to connect to weather service!';
            res.locals.error = error
            res.render('error')
          } else if(response.body.error) {
            res.locals.message = response.body.error.info;
            res.locals.error = response.body.error
            res.render('error')
          } else {
              const dataWeather = response.body.current;
    
              const data = {
                location: dataLocation.place_name,
                temperature: dataWeather.temperature,
                feelsLike: dataWeather.feelslike,
                description: dataWeather.weather_descriptions[0]
              }
    
              res.send(data)
          }
        })
    }
    
  })
})

module.exports = router;

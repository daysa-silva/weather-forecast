var express = require('express');
var router = express.Router();
const request = require('request')
require('dotenv').config();

const apiKey = process.env.API_KEY_GEO

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather Forecast App' });
});

router.post('/search', (req, res, next) => {
  const addressURI = encodeURI(req.body.location);
  const cat = req.body.cat;

  const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=${apiKey}&limit=1`
  
  request({url: urlGeo, json: true}, (error, response, callback) => {
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

        res.send( {
            location: dataLocation.place_name,
            latitude: dataLocation.center[1],
            longitude: dataLocation.center[0]
        })
    }
    
  })
})

module.exports = router;

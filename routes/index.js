var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather Forecast App' });
});

router.post('/search', (req, res, next) => {
  const addressURI = encodeURI(req.body.location);
  const cat = req.body.cat;

  //const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=${apiKey}&limit=1`
  res.send(req.body)
  // request.get(movieUrl, (error, response, movieData) => {
  //   const parsedData = JSON.parse(movieData);

  //   if (cat =="person") {
  //     parsedData.results = parsedData.results[0].known_for;
  //   }
    
  //   res.render('index', {
  //     parsedData: parsedData.results
  //   })
  // })
})

module.exports = router;

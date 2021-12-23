var express = require('express');
var router = express.Router();
const request = require('request')

router.get('/', function(req, res, next) {
    res.render('help', { title: 'Help' });
});

router.get('*', (req, res, next) => {
    res.send('Help article does not exist.')
})
module.exports = router;
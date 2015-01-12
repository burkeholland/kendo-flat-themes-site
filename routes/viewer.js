var express = require('express');
var router = express.Router();
var files = require('../data/files.js');

/* GET home page. */
router.get('/', function(req, res) {

  var css = req.query.css;

  if (css) {
    res.render('viewer', { url: 'stylesheets/themes/' + css });
  }
  else {
    res.render('viewer', { url: '' });
  }

});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var files = require('../data/files.js');
var download = require('../services/download.js');
var themes = require('../data/themes.js');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {

  console.log(themes);

  themes.get().then(function(data) {

    res.json(data);

  });

});

/* GET home page. */
router.get('/download', function(req, res) {
 
  var fileName = req.query.css;

  var file = path.resolve(__dirname, '..') + '/public/stylesheets/themes/' + fileName; 

  console.log(file);

  // send the file down to the client
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);

});

module.exports = router;
var express = require('express');
var router = express.Router();
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

  /* 
  if (id) {

    files.getById(id).then(function(file) {
    
      console.log(file);

      var cssFile = '../public/stylesheet/themes/' + file.CSSFileName;

      // send the file down to the client
      res.setHeader('Content-disposition', 'attachment; filename=' + file.result.Filename);

      // download.getFileByUri(file.result.Filename, file.result.Uri).then(function(css) {
      var filestream = fs.createReadStream(cssFile);
      filestream.pipe(res);
      // });
    });

  }
  */

  var file = './public/stylesheets/themes/' + fileName;

  // send the file down to the client
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);

});

module.exports = router;
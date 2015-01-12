var express = require('express');
var router = express.Router();
var files = require('../data/files.js');
var download = require('../services/download.js');
var themes = require('../data/themes.js');

/* GET users listing. */
router.get('/', function(req, res) {

  console.log(themes);

  themes.get().then(function(data) {

    res.json(data);

  });

});

/* GET home page. */
router.get('/download/:id', function(req, res) {
 
  var id = req.params.id;

  if (id) {

    files.getById(id).then(function(file) {
    
      // send the file down to the client
      res.setHeader('Content-disposition', 'attachment; filename=' + file.result.Filename);

      download.getFileByUri(file.result.Filename, file.result.Uri).then(function(css) {
        res.send(css);
      });
    });

  }
});

module.exports = router;
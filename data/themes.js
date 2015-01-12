var Q = require('q');
var everlive = require('./everlive.js');
var themes = everlive.data('Themes');


var get = function() {
  return themes.get();
};

module.exports = {
  get: get
};
var fs = require('fs');
var request = require('request');
var Q = require('q');

var getFileByUri = function (filename, uri) {

  var deferred = Q.defer();

  request(uri, function(error, response, body) {
    console.log(body);
    deferred.resolve(body);
  });

  return deferred.promise;
};

module.exports = {

  getFileByUri: getFileByUri

};
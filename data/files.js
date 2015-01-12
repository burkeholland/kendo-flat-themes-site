var everlive = require('./everlive.js');

var getDownloadUrlById = function(id) {
  return everlive.Files.getDownloadUrlById(id);
};

var getById = function(id) {
  return everlive.Files.getById(id);
};

module.exports = {
  getDownloadUrlById: getDownloadUrlById,
  getById: getById
};
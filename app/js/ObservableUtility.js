var Observable = require("FuseJS/Observable")

function observeEachItem(collection) {
  return collection.map(function(item) {
    return Observable(item);
  }); 
}

module.exports = {
  observeEachItem: observeEachItem
}
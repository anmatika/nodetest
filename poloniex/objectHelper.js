function objectToArray(obj) {
  return Object.keys(obj)
    .map(key => ({ key, value: obj[key] }));
}

function getGreaterThanZeroValuesFromObject(obj) {
  const objArray = objectToArray(obj);
  return objArray
    .filter(object => parseFloat(object.value) > 0);
}

module.exports.objectToArray = objectToArray;
module.exports.getGreaterThanZeroValuesFromObject = getGreaterThanZeroValuesFromObject;

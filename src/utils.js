const isArray = function (object) {
  return Array.isArray(object);
};

const isObject = function (object) {
  return object === Object(object) && !isArray(object) && typeof object !== `function`;
};

const toCamel = (propertyName) => {
  return propertyName.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
  });
};

const applyCamelCase = function (object) {
  if (isObject(object)) {
    const objectWithPropInCamelCase = {};

    Object.keys(object)
      .forEach((key) => {
        objectWithPropInCamelCase[toCamel(key)] = applyCamelCase(object[key]);
      });

    return objectWithPropInCamelCase;
  } else if (isArray(object)) {
    return object.map((item) => {
      return applyCamelCase(item);
    });
  }
  return object;
};

const extractCitiesFromOffers = function (offers) {
  const citiesSet = new Set();
  const cities = [];
  for (let offer of offers) {
    if (!citiesSet.has(offer.city.name)) {
      cities.push(offer.city);
      citiesSet.add(offer.city.name);
    }
  }

  return cities;
};

export {applyCamelCase, extractCitiesFromOffers};

const placesSortingOptions = [
  {caption: `Popular`, value: `popular`},
  {caption: `Price: low to high`, value: `price`, order: `ASC`},
  {caption: `Price: high to low`, value: `price`, order: `DESC`},
  {caption: `Top rated first`, value: `rating`, order: `DESC`}
];

const defaultSortingOptionItem = placesSortingOptions[0];

export {placesSortingOptions, defaultSortingOptionItem};

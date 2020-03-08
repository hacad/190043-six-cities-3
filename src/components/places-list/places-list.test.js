import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

const cityPlaces = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-01.jpg`,
    category: `Premium`,
    name: `Beautiful &amp; luxurious apartment at great location`,
    price: {
      value: 120,
      currency: `€`
    },
    rating: 93,
    bookmarked: false,
    location: {
      latitude: 52.370216,
      longitude: 4.895168
    }
  }
];

it(`PlacesList correctly renders after relaunch`, () => {
  const placesList = renderer
    .create(<PlacesList
      cityPlaces={cityPlaces}
      onClickCardHeader={jest.fn()}/>)
    .toJSON();

  expect(placesList).toMatchSnapshot();
});

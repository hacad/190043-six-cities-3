import React from "react";
import renderer from "react-test-renderer";
import CitiesMap from "./cities-map.jsx";

jest.mock(`leaflet`);

it(`CitiesMap renders correctly`, () => {
  const city = {name: ``, location: {latitude: 52.38333, longitude: 4.9}};
  const offers = [
    {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    }
  ];

  const placesMap = renderer.create(
      <CitiesMap city={city} offers={offers}/>
  );

  expect(placesMap).toMatchSnapshot();
});

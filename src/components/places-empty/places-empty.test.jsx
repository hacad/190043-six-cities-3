import React from "react";
import renderer from "react-test-renderer";
import PlacesEmpty from "./places-empty.jsx";

it(`PlacesEmpty correctly renders after relaunch`, () => {
  const placesEmpty = renderer
      .create(<PlacesEmpty cityName="Dusseldorf"/>)
      .toJSON();

  expect(placesEmpty).toMatchSnapshot();
});

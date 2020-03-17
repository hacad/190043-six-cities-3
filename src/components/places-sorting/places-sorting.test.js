import React from "react";
import renderer from "react-test-renderer";
import PlacesSorting from "./places-sorting.jsx";
import {placesSortingOptions} from "../../mocks/places-sorting-options";

it(`PlacesSorting correctly renders after relaunch`, () => {
  const placesSorting = renderer.create(
      <PlacesSorting
        items={placesSortingOptions}
        onItemSelect={jest.fn()}
        selectedItem={placesSortingOptions[0]}
        activeOpen={true}
        onOpenActivate={jest.fn()}
        activeCity={{
          name: `Paris`,
          location: {
            latitude: 48.856663,
            longitude: 2.351556,
            zoom: 10
          }
        }}
      />
  ).toJSON();

  expect(placesSorting).toMatchSnapshot();
});

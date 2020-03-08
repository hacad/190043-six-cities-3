import React from "react";
import renderer from "react-test-renderer";
import PlacesSorting from "./places-sorting.jsx";
import {placesSortingOptions} from "../../mocks/places-sorting-options";

it(`PlacesSorting correctly renders after relaunch`, () => {
  const placesSorting = renderer.create(
      <PlacesSorting
        items={placesSortingOptions}
        onItemSelect={jest.fn()}
        activeItem={placesSortingOptions[0]}
        onActivateItem={jest.fn()}
        activeOpened={true}
        onActivateOpened={jest.fn()}
      />
  ).toJSON();

  expect(placesSorting).toMatchSnapshot();
});

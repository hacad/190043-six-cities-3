import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./favorites.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);

it(`Favorites correctly renders after relaunch`, () => {
  // Arrange && Act
  const favorites = renderer.create(<Favorites />).toJSON();

  // Assert
  expect(favorites).toMatchSnapshot();
});

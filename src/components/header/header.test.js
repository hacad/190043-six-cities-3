import React from "react";
import renderer from "react-test-renderer";

import Header from "./header.jsx";

const mock = {
  user: {
    id: 1,
    email: `name-a-surname@email.ru`,
    name: `Name A. Surname`,
    avatarUrl: ``,
    isPro: false
  },
  onClickSignIn: jest.fn()
};

it(`SignIn correctly renders with authorization required`, () => {
  // Arrange
  const {
    onClickSignIn
  } = mock;

  // Act
  const header = renderer.create(
      <Header
        isAuthorized={false}
        user={undefined}
        onClickSignIn={onClickSignIn}
      />).toJSON();

  // Assert
  expect(header).toMatchSnapshot();
});

it(`SignIn correctly renders without authorization required`, () => {
  // Arrange
  const {user, onClickSignIn} = mock;

  // Act
  const header = renderer.create(
      <Header
        isAuthorized={true}
        user={user}
        onClickSignIn={onClickSignIn}
      />).toJSON();

  // Assert
  expect(header).toMatchSnapshot();
});

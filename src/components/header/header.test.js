import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./header.jsx";

const mock = {
  user: {
    id: 1,
    email: `name-a-surname@email.ru`,
    name: `Name A. Surname`,
    avatarUrl: ``,
    isPro: false
  }
};

it(`SignIn correctly renders with authorization required`, () => {
  // Arrange && Act
  const header = renderer.create(
      <Router>
        <Header
          isAuthorized={false}
          user={undefined}
        />
      </Router>).toJSON();

  // Assert
  expect(header).toMatchSnapshot();
});

it(`SignIn correctly renders without authorization required`, () => {
  // Arrange
  const {user} = mock;

  // Act
  const header = renderer.create(
      <Router>
        <Header
          isAuthorized={true}
          user={user}
        />
      </Router>).toJSON();

  // Assert
  expect(header).toMatchSnapshot();
});

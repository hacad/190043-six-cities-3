import React from "react";
import renderer from "react-test-renderer";
import ErrorLabel from "./error-label.jsx";

it(`ErrorLabel correctly renders after relaunch`, () => {
  const errorLabel = renderer.create(
      <ErrorLabel
        textLabel="some error text"
        htmlFor="id"
      />).toJSON();

  expect(errorLabel).toMatchSnapshot();
});

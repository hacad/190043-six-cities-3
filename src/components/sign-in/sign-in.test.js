import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);

it(`SignIn correctly renders after relaunch`, () => {
  const signIn = renderer.create(
      <SignIn
        onClickSignIn={jest.fn()}
        onSubmit={jest.fn()}
        onChange={jest.fn()}
      />
  )
  .toJSON();

  expect(signIn).toMatchSnapshot();
});

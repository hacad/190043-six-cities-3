import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`SignIn call onSubmit when button clicked`, () => {
  // Arrange
  const submitHandler = jest.fn();
  const signIn = shallow(
      <SignIn
        isCredentialsValid={true}
        onClickSignIn={submitHandler}
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
      />
  );

  // Act
  const formNode = signIn.find(`form.login__form`);
  formNode.simulate(`submit`);

  // Assert
  expect(submitHandler).toHaveBeenCalledTimes(1);
});

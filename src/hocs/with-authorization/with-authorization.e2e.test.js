import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withAuthorization} from "./with-authorization.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withAuthorization(MockComponent);

it(`When email and password are set isCredentialsValid should be true`, () => {
  // Arrange
  const wrapper = shallow(
      <MockComponentWrapped
        login={jest.fn()}
        logout={jest.fn()}
        isAuthorized={false}
      />);

  // Act
  const email = `email@email.com`;
  const password = `password`;
  wrapper.props().onEmailChange({target: {value: email}});
  wrapper.props().onPasswordChange({target: {value: password}});

  // Assert
  expect(wrapper.state().isCredentialsValid).toEqual(true);
});

it(`When email or password are not set isCredentialsValid should be false`, () => {
  // Arrange
  const wrapper = shallow(
      <MockComponentWrapped
        login={jest.fn()}
        logout={jest.fn()}
        isAuthorized={false}
      />);

  // Act
  const email = `email@email.com`;
  const emptyPassword = ``;
  wrapper.props().onEmailChange({target: {value: email}});
  wrapper.props().onPasswordChange({target: {value: emptyPassword}});

  // Assert
  expect(wrapper.state().isCredentialsValid).toEqual(false);
});

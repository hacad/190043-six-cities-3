import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";
import {withAuthorization} from "./with-authorization.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withAuthorization(MockComponent);
const GuardedMockComponentWrapped = withAuthorization(MockComponent, true);

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

it(`When isPrivate and is not authorized should redirect to login`, () => {
  // Arrange
  const wrapper = mount(
      <Router>
        <GuardedMockComponentWrapped
          login={jest.fn()}
          logout={jest.fn()}
          isAuthorized={false}
        />
      </Router>);
  // Act && Assert
  expect(wrapper.find(`MockComponent`).length).toEqual(0);
  expect(wrapper.find(`Router`).prop(`history`).location.pathname).toEqual(`/login`);
});

it(`When isPrivate and is authorized should return guarded component`, () => {
  // Arrange
  const wrapper = mount(
      <Router>
        <GuardedMockComponentWrapped
          login={jest.fn()}
          logout={jest.fn()}
          isAuthorized={true}
        />
      </Router>);
  // Act && Assert
  expect(wrapper.find(`MockComponent`).length).toEqual(1);
});

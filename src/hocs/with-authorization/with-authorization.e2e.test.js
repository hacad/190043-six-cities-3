import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";
import {withAuthorization} from "./with-authorization.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const GuardedMockComponentWrapped = withAuthorization(MockComponent, true);

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

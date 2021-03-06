import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";
import {withAuthorization} from "./with-authorization.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

it(`When isAuthorizedState is equal isAuthorized should redirect to passed url`, () => {
  // Arrange
  const GuardedMockComponentWrapped = withAuthorization(MockComponent, false, `/login`);
  const wrapper = mount(
      <Router>
        <GuardedMockComponentWrapped
          login={jest.fn()}
          isAuthorized={false}
        />
      </Router>);
  // Act && Assert
  expect(wrapper.find(`MockComponent`).length).toEqual(0);
  expect(wrapper.find(`Router`).prop(`history`).location.pathname).toEqual(`/login`);
});

it(`When isAuthorizedState is not equal isAuthorized should return guarded component`, () => {
  // Arrange
  const GuardedMockComponentWrapped = withAuthorization(MockComponent, false, `/login`);
  const wrapper = mount(
      <Router>
        <GuardedMockComponentWrapped
          login={jest.fn()}
          isAuthorized={true}
        />
      </Router>);
  // Act && Assert
  expect(wrapper.find(`MockComponent`).length).toEqual(1);
});

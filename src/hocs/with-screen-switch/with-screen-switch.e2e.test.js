import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withScreenSwitch} from "./with-screen-switch.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withScreenSwitch(MockComponent);

// https://stackoverflow.com/questions/42836544/jest-enzyme-testing-a-method-that-returns-jsx
it(`When is not authorized should return SignIn component`, () => {
  // Arrange
  const wrapper = shallow(
      <MockComponentWrapped
        isAuthorized={false}
        cities={[]}
        places={[]}
        onChangeCity={jest.fn()}
      />);

  // Act
  const screen = wrapper.props().renderScreen();

  // Assert
  expect(screen.type.WrappedComponent.name).toEqual(`WithAuthorization`);
});

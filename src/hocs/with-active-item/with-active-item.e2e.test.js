import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`When onActivateItem is called should contain passed value`, () => {
  // Arrange
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  const activeItem = `some value`;
  wrapper.props().onActivateItem(activeItem);

  // Assert
  expect(wrapper.state().activeItem).toEqual(activeItem);
});

it(`When onDeactivateItem is called should clear current value`, () => {
  // Arrange
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  wrapper.props().onDeactivateItem();

  // Assert
  expect(wrapper.state().activeItem).toBeNull();
});

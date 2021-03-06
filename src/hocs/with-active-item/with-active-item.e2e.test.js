import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item.js";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`When onItemActivate is called should contain passed value`, () => {
  // Arrange
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  const activeItem = `some value`;
  wrapper.props().onItemActivate(activeItem);

  // Assert
  expect(wrapper.state().activeItem).toEqual(activeItem);
});

it(`When onItemnDeactivate is called should clear current value`, () => {
  // Arrange
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  wrapper.props().onItemDeactivate();

  // Assert
  expect(wrapper.state().activeItem).toBeNull();
});

it(`When defaultActiveItem is set should be returned as current value`, () => {
  // Arrange
  const ComponentWrappedWithDefaultActiveItem = withActiveItem(MockComponent, `value`);
  const wrapper = shallow(<ComponentWrappedWithDefaultActiveItem />);

  // Act && Assert
  expect(wrapper.state().activeItem).toEqual(`value`);
});

it(`When item name is set should be used as part of active item and event names`, () => {
  // Arrange
  const ComponentWrappedWithItemName = withActiveItem(MockComponent, `value`, `Open`);
  const wrapper = shallow(<ComponentWrappedWithItemName />);

  // Act && Assert
  expect(wrapper.state()).toHaveProperty(`activeOpen`);
  expect(wrapper.state().activeOpen).toEqual(`value`);
  expect(wrapper.props()).toHaveProperty(`onOpenActivate`);
  expect(wrapper.props().onOpenActivate).toBeInstanceOf(Function);
  expect(wrapper.props()).toHaveProperty(`onOpenDeactivate`);
  expect(wrapper.props().onOpenDeactivate).toBeInstanceOf(Function);
});

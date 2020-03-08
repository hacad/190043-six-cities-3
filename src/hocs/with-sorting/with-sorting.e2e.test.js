import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {placesSortingOptions} from "../../mocks/places-sorting-options";
import withSorting from "./with-sorting.js";

Enzyme.configure({adapter: new Adapter()});

const places = [{
  id: 15,
  city: {
    name: `Hamburg`,
    location: {
      latitude: 53.552645,
      longitude: 9.966287,
      zoom: 10
    }
  },
  type: `Apartment`,
  previewImage: `img/apartment-03.jpg`,
  isPremium: false,
  title: `Nice, cozy, warm big bed apartment`,
  price: 180,
  rating: 99,
  isFavorite: false,
  location: {
    latitude: 53.554221,
    longitude: 9.992588
  }
},
{
  id: 16,
  city: {
    name: `Paris`,
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: 10
    }
  },
  type: `Apartment`,
  previewImage: `img/apartment-02.jpg`,
  isPremium: false,
  title: `Nice, cozy, warm big bed apartment`,
  price: 300,
  rating: 100,
  isFavorite: false,
  location: {
    latitude: 48.845933,
    longitude: 2.357839
  }
}];
const MockComponent = () => <div />;


it(`When withSorting is changed should sort passed values`, () => {
  // Arrange
  const MockComponentWrapped = withSorting(MockComponent, places, placesSortingOptions[1].order);
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  wrapper.props().onChangeSorting(placesSortingOptions[3]);

  // Assert
  const sortedItems = wrapper.state().list;
  expect(sortedItems.length).toEqual(2);
  expect(sortedItems[0].id).toEqual(places[1].id);
  expect(sortedItems[1].id).toEqual(places[0].id);
});

it(`When withSorting order is not set should return original order`, () => {
  // Arrange
  const MockComponentWrapped = withSorting(MockComponent, places, `ASC`);
  const wrapper = shallow(<MockComponentWrapped />);

  // Act
  wrapper.props().onChangeSorting({value: placesSortingOptions[3].rating});

  // Assert
  const sortedItems = wrapper.state().list;
  expect(sortedItems.length).toEqual(2);
  expect(sortedItems[0].id).toEqual(places[0].id);
  expect(sortedItems[1].id).toEqual(places[1].id);
});

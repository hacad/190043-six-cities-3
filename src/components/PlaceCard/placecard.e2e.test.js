import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './placecard.jsx';

const testPlace = {
  id: 1,
  type: `Apartment`,
  img: `img/apartment-01.jpg`,
  category: `Premium`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  price: {
    value: 120,
    currency: `€`
  },
  rating: 93,
  bookmarked: false
};

Enzyme.configure({adapter: new Adapter()});

it(`Handler is called when click on header`, () => {
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onClickHeader={clickHandler}
    onActivate={jest.fn()}
    onDeactivate={jest.fn()}
  />);

  const placeNameNode = placeCard.find(`h2.place-card__name`);
  placeNameNode.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Handler is called when card is hovered`, () => {
  const onActivateHandler = jest.fn();
  const onDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onActivate={onActivateHandler}
    onDeactivate={onDeactivateHandler}
    onClickHeader={jest.fn()}
  />);

  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  expect(onActivateHandler).toHaveBeenCalledTimes(1);
});

it(`Active place is set correctly`, () => {
  const onActivateHandler = jest.fn();
  const onDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onActivate={onActivateHandler}
    onDeactivate={onDeactivateHandler}
    onClickHeader={jest.fn()}
  />);

  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  expect(onActivateHandler).toHaveBeenCalledTimes(1);
  expect(onActivateHandler).toHaveBeenCalledWith(testPlace);
});

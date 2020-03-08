import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './placecard';

Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    placeName={`Canal View Prinsengracht`}
    onClickHeader={clickHandler}
  />);

  const placeNameNode = placeCard.find(`h2.place-card__name`);
  placeNameNode.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {Property} from "./property.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);

const testProperty = {
  id: 1,
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  },
  type: `apartment`,
  previewImage: `img/apartment-01.jpg`,
  images: [`1.jpg`, `2.jpg`, `3.jpg`],
  isPremium: false,
  title: `Beautiful &amp; luxurious apartment at great location`,
  price: 120,
  rating: 93,
  starRating: 93,
  isFavorite: false,
  goods: [`Coffee machine`, `Wi-Fi`],
  host: {
    id: 25,
    name: `Angelina`,
    isPro: true,
    avatarUrl: `img/avatar-angelina.jpg`
  },
  location: {
    latitude: 52.370216,
    longitude: 4.895168
  }
};

const reviews = [
  {
    "id": 1,
    "user": {
      "id": 18,
      "isPro": true,
      "name": `Sophie`,
      "avatarUrl": `https://htmlacademy-react-2.appspot.com/six-cities/static/avatar/9.jpg`
    },
    "rating": 4,
    "comment": `The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.`,
    "date": new Date(`2019-12-03T14:11:47.471Z`)
  }
];

it(`Property correctly renders after relaunch`, () => {
  const offer = testProperty;

  const property = renderer.create(
      <Router>
        <Property
          hotelId={1}
          offer={offer}
          nearOffers={[]}
          comments={reviews}
          loadComments={jest.fn()}
          className="near-places__list places__list"
          handleItemActivate={jest.fn()}
          handleItemDeactivate={jest.fn()} />
      </Router>).toJSON();

  expect(property).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import ReviewList from "./review-list.jsx";

jest.mock(`../review-form/review-form.jsx`, () => () => `<div />`);

it(`ReviewList correctly renders after relaunch when user is not authorized`, () => {
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

  const reviewList = renderer.create(
      <ReviewList hotelId={1} reviews={reviews} isAuthorized={false}/>
  ).toJSON();

  expect(reviewList).toMatchSnapshot();
});

it(`ReviewList correctly renders after relaunch when user is authorized`, () => {
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

  const reviewList = renderer.create(
      <ReviewList hotelId={1} reviews={reviews} isAuthorized={true}/>
  ).toJSON();

  expect(reviewList).toMatchSnapshot();
});

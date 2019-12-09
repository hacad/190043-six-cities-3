import React from "react";
import renderer from "react-test-renderer";
import ReviewList from "./review-list.jsx";

it(`ReviewList correctly renders after relaunch`, () => {
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
      <ReviewList reviews={reviews}/>
  ).toJSON();

  expect(reviewList).toMatchSnapshot();
});

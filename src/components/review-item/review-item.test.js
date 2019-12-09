import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item.jsx";

it(`ReviewItem correctly renders after relaunch`, () => {
  const review = {
    "id": 1,
    "user": {
      "id": 17,
      "isPro": false,
      "name": `Emely`,
      "avatarUrl": `https://htmlacademy-react-2.appspot.com/six-cities/static/avatar/8.jpg`
    },
    "rating": 3,
    "comment": `The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.`,
    "date": new Date(`2019-12-03T14:11:47.471Z`)
  };
  const reviewItem = renderer.create(
      <ReviewItem review={review}/>
  ).toJSON();

  expect(reviewItem).toMatchSnapshot();
});

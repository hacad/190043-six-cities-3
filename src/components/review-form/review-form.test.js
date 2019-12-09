import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";

it(`ReviewForm correctly renders after relaunch`, () => {
  const reviewForm = renderer.create(
      <ReviewForm />
  ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});

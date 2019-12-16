import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";

it(`ReviewForm correctly renders after relaunch`, () => {

  const reviewForm = renderer.create(
      <ReviewForm
        hotelId={1}
        onSubmit={jest.fn()}
        onSendForm={jest.fn()}
        onChange={jest.fn()}
        isDisabled={false}
        form={{rating: 5, comment: `comment`}}
        errors={{}}
      />
  ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});

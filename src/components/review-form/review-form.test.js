import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";

it(`ReviewForm correctly renders after relaunch`, () => {

  const reviewForm = renderer.create(
      <ReviewForm
        hotelId={1}
        handleSubmit={jest.fn()}
        handleSendForm={jest.fn()}
        handleChange={jest.fn()}
        isDisabled={false}
        form={{rating: `5`, comment: `comment`}}
        errors={{}}
        handleItemActivate={jest.fn()}
        activeItem={false}
      />
  ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});

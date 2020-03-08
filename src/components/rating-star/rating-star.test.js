import React from "react";
import renderer from "react-test-renderer";

import RatingStar from "./rating-star.jsx";

it(`Rating Star correctly renders after relaunch`, () => {
  const ratingStar = renderer.create(
      <RatingStar
        title="perfect!"
        value={5}
      />
  ).toJSON();

  expect(ratingStar).toMatchSnapshot();
});

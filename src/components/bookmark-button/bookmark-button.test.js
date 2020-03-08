import React from "react";
import renderer from "react-test-renderer";
import {BookmarkButton} from "./bookmark-button.jsx";

it(`BookmarkButton correctly renders after relaunch`, () => {
  const bookmarkButton = renderer.create(
      <BookmarkButton
        offerId={1}
        isFavorite={true}
        toggleFavorite={jest.fn()}
        iconWidth={18}
        iconHeight={19}
        classNamePrefix="place-card"
        isAuthorized={true}
      />).toJSON();

  expect(bookmarkButton).toMatchSnapshot();
});

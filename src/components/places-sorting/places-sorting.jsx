import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesSortingPropType from "../prop-types/places-sorting.js";

class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);

    this._handleItemClick = this._handleItemClick.bind(this);
    this._handleSelectToggle = this._handleSelectToggle.bind(this);
  }

  render() {
    const {items, activeItem, activeOpened} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type" tabIndex="0"
          onClick={this._handleSelectToggle}
        >
          {activeItem.caption}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${activeOpened ? `places__options--opened` : ``}`}>
          {
            items.map((item, index) => (
              <li
                key={item.caption}
                className={`places__option ${activeItem.caption === item.caption ? `places__option--active` : ``}`}
                tabIndex={index}
                onClick={() => this._handleItemClick(item)}
              >
                {item.caption}
              </li>
            ))
          }
        </ul>
      </form>
    );
  }

  _handleItemClick(selectedItem) {
    this.props.onActivateOpened(false);
    this.props.onActivateItem(selectedItem);
    this.props.onItemSelect(selectedItem);
  }

  _handleSelectToggle() {
    this.props.onActivateOpened(!this.props.activeOpened);
  }
}

PlacesSorting.propTypes = {
  items: PropTypes.arrayOf(PlacesSortingPropType).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  activeItem: PlacesSortingPropType.isRequired,
  onActivateItem: PropTypes.func.isRequired,
  activeOpened: PropTypes.bool.isRequired,
  onActivateOpened: PropTypes.func.isRequired
};

export default PlacesSorting;
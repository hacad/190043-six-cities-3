import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesSortingPropType from "../../prop-types/places-sorting.js";
import CityPropType from "../../prop-types/city.js";

class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);

    this._handleItemClick = this._handleItemClick.bind(this);
    this._handleSelectToggle = this._handleSelectToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCity !== this.props.activeCity) {
      this.props.onOpenActivate(false);
    }
  }

  render() {
    const {items, selectedItem, activeOpen} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type" tabIndex="0"
          onClick={this._handleSelectToggle}
        >
          {selectedItem.caption}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${activeOpen ? `places__options--opened` : ``}`}>
          {
            items.map((item, index) => (
              <li
                key={item.caption}
                className={`places__option ${selectedItem.caption === item.caption ? `places__option--active` : ``}`}
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
    this.props.onOpenActivate(false);
    this.props.onItemSelect(selectedItem);
  }

  _handleSelectToggle() {
    this.props.onOpenActivate(!this.props.activeOpen);
  }
}

PlacesSorting.propTypes = {
  items: PropTypes.arrayOf(PlacesSortingPropType).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PlacesSortingPropType.isRequired,
  activeOpen: PropTypes.bool.isRequired,
  onOpenActivate: PropTypes.func.isRequired,
  activeCity: CityPropType.isRequired
};

export default PlacesSorting;

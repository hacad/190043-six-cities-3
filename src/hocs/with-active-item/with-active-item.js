import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };

      this._handleActivateItem = this._handleActivateItem.bind(this);
      this._handleDeactivateItem = this._handleDeactivateItem.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onActivateItem={this._handleActivateItem}
          onDeactivateItem={this._handleDeactivateItem}
        />
      );
    }

    _handleActivateItem(item) {
      this.setState({activeItem: item});
    }

    _handleDeactivateItem() {
      this.setState({activeItem: null});
    }
  }

  return WithActiveItem;
};

export default withActiveItem;

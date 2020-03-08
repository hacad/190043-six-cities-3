import React, {PureComponent} from "react";

const withActiveItem = (Component, defaultItem, itemName) => {
  const defaultItemName = itemName || `Item`;
  const activeItemName = `active${itemName || defaultItemName}`;
  const activateHandlerName = `_handleActivate${defaultItemName}`;
  const deactivateHandlerName = `_handleDeactivate${defaultItemName}`;

  const activateItemEventName = `onActivate${defaultItemName}`;
  const deactivateItemEventName = `onDeactivate${defaultItemName}`;

  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [activeItemName]: defaultItem
      };

      this[activateHandlerName] = this[activateHandlerName].bind(this);
      this[deactivateHandlerName] = this[deactivateHandlerName].bind(this);
    }

    render() {
      const childProps = {
        [activateItemEventName]: this[activateHandlerName],
        [deactivateItemEventName]: this[deactivateHandlerName]
      };

      childProps[activeItemName] = this.state[activeItemName];
      return (
        <Component
          {...this.props}
          {...childProps}
        />
      );
    }

    [activateHandlerName](item) {
      this.setState({[activeItemName]: item});
    }

    [deactivateHandlerName]() {
      this.setState({[activeItemName]: null});
    }
  }

  return WithActiveItem;
};

export default withActiveItem;

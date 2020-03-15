import React, {PureComponent} from "react";

const withActiveItem = (Component, defaultItem, itemName) => {
  const defaultItemName = itemName || `Item`;
  const activeItemName = `active${itemName || defaultItemName}`;
  const activateHandlerName = `_handle${defaultItemName}Activate`;
  const deactivateHandlerName = `_handle${defaultItemName}Deactivate`;

  const itemActivateEventName = `handle${defaultItemName}Activate`;
  const itemDeactivateEventName = `handle${defaultItemName}Deactivate`;

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
        [itemActivateEventName]: this[activateHandlerName],
        [itemDeactivateEventName]: this[deactivateHandlerName]
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

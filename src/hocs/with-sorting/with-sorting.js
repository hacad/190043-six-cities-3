import React, {PureComponent} from "react";

const sortByOrder = (arr, value, order) => {
  switch (order) {
    case `ASC`: return arr.sort((a, b) => a[value] - b[value]);
    case `DESC`: return arr.sort((a, b) => b[value] - a[value]);
    default: return arr;
  }
};

function withSorting(Component, items, defaultOrder, sortedItemsName = `sortedItems`, changeSortingEventName = `onChangeSorting`) {
  return class WithSorting extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        order: defaultOrder,
        [sortedItemsName]: [...items]
      };
      this._sortItemsByOrder = this._sortItemsByOrder.bind(this);
    }

    render() {
      const childProps = {
        [changeSortingEventName]: this._sortItemsByOrder,
      };

      childProps[sortedItemsName] = this.state[sortedItemsName];
      return (
        <Component
          {...this.props}
          {...childProps}
        />
      );
    }

    _sortItemsByOrder({value, order}) {
      if (!order) {
        this.setState({[sortedItemsName]: [...items], order: defaultOrder});
      } else {
        this.setState({[sortedItemsName]: [...sortByOrder(this.state[sortedItemsName], value, order)], order});
      }
    }
  };
}

export default withSorting;

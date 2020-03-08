import React, {PureComponent} from "react";

const sortByOrder = (arr, value, order) => {
  switch (order) {
    case `ASC`: return arr.sort((a, b) => a[value] - b[value]);
    case `DESC`: return arr.sort((a, b) => b[value] - a[value]);
    default: return arr;
  }
};

function withSorting(Component, items, defaultOrder) {
  return class WithSorting extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        order: defaultOrder,
        list: [...items]
      };
      this._sortItemsByOrder = this._sortItemsByOrder.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          sortedItems={this.state.list}
          onChangeSorting={this._sortItemsByOrder}
        />
      );
    }

    _sortItemsByOrder({value, order}) {
      if (!order) {
        this.setState({list: [...items], order: defaultOrder});
      } else {
        this.setState({list: [...sortByOrder(this.state.list, value, order)], order});
      }
    }
  };
}

export default withSorting;

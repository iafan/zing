/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import React from 'react';


class Tabs extends React.PureComponent {

  static propTypes() {
    return {
      children: React.PropTypes.node.isRequired,
      initialTab: React.PropTypes.number,
      onChange: React.PropTypes.func,
    };
  }

  /* Lifecycle */

  constructor() {
    super();
    this.state = {
      selectedTab: 0/*this.defaultProps.initialTab*/,
    };
  }


  /* Handlers */

  handleClick(index) {
    this.setState({ selectedTab: index });

    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }


  /* Layout */

  render() {
    let tabContent;

    // TODO: move to a function, retrieve values via destructuring assig.
    const tabList = React.Children.map(this.props.children, (child, index) => {
      const elementType = child.type.name;
      // FIXME: validate via custom propTypes
      if (elementType !== 'Tab') {
        throw new Error(`
          Invalid children for component 'Tabs'. Expected: 'Tab'.
          Found: '${elementType}'
        `);
      }

      const isActive = this.state.selectedTab === index;
      if (isActive) {
        tabContent = child.props.children;
      }

      return React.cloneElement(child, {
        key: index,
        onClick: (e) => this.handleClick(e),
        selected: isActive,
        tabIndex: index,
      });
    }, this);

    return (
      <div className="Tabs">
        <ul className="Tabs__TabList">
          {tabList}
        </ul>
        <div className="Tabs__TabContent">
          {tabContent}
        </div>
      </div>
    );
  }

}

Tabs.defaultProps = {
  initialTab: 0,
};


export default Tabs;

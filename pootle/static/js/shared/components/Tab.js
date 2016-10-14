/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import cx from 'classnames';
import React from 'react';


class Tab extends React.PureComponent {

  static propTypes() {
    return {
      onClick: React.PropTypes.func, // Required but added dynamically
      tabIndex: React.PropTypes.number, // Required but added dynamically
      title: React.PropTypes.string.isRequired,
      selected: React.PropTypes.bool,
    };
  }

  render() {
    const classes = cx({
      TabList__Tab: true,
      'TabList__Tab--is-active': this.props.selected,
    });
    const style = {
      display: 'inline-block',
      cursor: this.props.selected ? 'default' : 'pointer',
    };

    const props = {
      style,
      className: classes,
    };
    if (!this.props.selected) {
      props.onClick = this.props.onClick.bind(null, this.props.tabIndex);
    }

    return (
      <li {...props}>
        {this.props.title}
      </li>
    );
  }

}


export default Tab;

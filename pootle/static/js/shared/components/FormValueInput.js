/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import React from 'react';

import _ from 'underscore';
import AutosizeTextarea from './AutosizeTextarea';


class FormValueInput extends React.Component {

  static propTypes() {
    return {
      handleChange: React.PropTypes.func.isRequired,
      autosize: React.PropTypes.bool,
      type: React.PropTypes.string,
      value: React.PropTypes.string,
    };
  }

  static defaultProps() {
    return {
      autosize: true,
    };
  }

  handleChange(e) {
    this.props.handleChange(e.target.name, e.target.value);
  }


  render() {
    if (this.props.type === 'textarea') {
      if (this.props.autosize) {
        return (
          <AutosizeTextarea
            onChange={ (e) => this.handleChange(e) }
            {...this.props}
          />
        );
      }

      return (
        <textarea
          onChange={ (e) => this.handleChange(e) }
          {...this.props}
        />
      );
    }

    return (
      <input
        onChange={ (e) => this.handleChange(e) }
        {..._.omit(this.props, 'handleChange', 'errors')}
      />
    );
  }

}


export default FormValueInput;

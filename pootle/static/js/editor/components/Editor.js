/*
 * Copyright (C) Pootle contributors.
 * Copyright (C) Zing contributors.
 *
 * This file is a part of the Zing project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import React from 'react';

import { t } from 'utils/i18n';

import EditingArea from '../components/EditingArea';
import RawFontTextarea from '../components/RawFontTextarea';
import { getAreaId } from '../utils';


const Editor = React.createClass({

  propTypes: {
    initialValues: React.PropTypes.array,
    isDisabled: React.PropTypes.bool,
    isRawMode: React.PropTypes.bool,
    // FIXME: needed to allow interaction from the outside world. Remove ASAP.
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
    targetNplurals: React.PropTypes.number.isRequired,
    values: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      initialValues: [],
    };
  },

  render() {
    const editingAreas = [];
    const TextareaComponent = RawFontTextarea;

    for (let i = 0; i < this.props.targetNplurals; i++) {
      const extraProps = {};
      if (this.props.isRawMode !== undefined) {
        extraProps.isRawMode = this.props.isRawMode;
      }

      editingAreas.push(
        <EditingArea
          isDisabled={this.props.isDisabled}
          key={i}
        >
          {(this.props.targetNplurals > 1) &&
            <div className="subheader">
              { t('Plural form %(index)s', { index: i }) }
            </div>
          }
          <TextareaComponent
            autoFocus={i === 0}
            id={getAreaId(i)}
            initialValue={this.props.initialValues[i]}
            isDisabled={this.props.isDisabled}
            onChange={(value) => this.props.onChange(i, value)}
            value={this.props.values[i]}
            {...extraProps}
          />
        </EditingArea>
      );
    }
    return (
      <div>
        {editingAreas}
      </div>
    );
  },

});


export default Editor;

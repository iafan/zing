/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import React from 'react';

import TimeSince from 'components/TimeSince';
import { tct } from 'utils/i18n';

class UploadTimeSince extends React.PureComponent {

  static propTypes() {
    return {
      dateTime: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
    };
  }

  render() {
    const timeSince = (
      <TimeSince
        className=""
        {...this.props}
      />
    );

    return (
      <span className="extra-item-meta">
        {tct('%(timeSince)s via file upload', { timeSince })}
      </span>
    );
  }

}


export default UploadTimeSince;

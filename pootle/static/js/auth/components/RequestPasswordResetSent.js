/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import React from 'react';

import { requestPasswordReset } from '../actions';
import AuthContent from './AuthContent';
import RequestPasswordResetProgress from './RequestPasswordResetProgress';


const RequestPasswordResetSent = React.createClass({

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    resetEmail: React.PropTypes.string.isRequired,
  },

  /* Handlers */

  handleResendEmail() {
    this.props.dispatch(requestPasswordReset({
      email: this.props.resetEmail,
    }));
  },


  /* Layout */

  render() {
    if (this.props.isLoading) {
      return <RequestPasswordResetProgress email={this.props.resetEmail} />;
    }

    const emailLinkMsg = interpolate(
      gettext('We have sent an email containing the special link to <span>%s</span>'),
      [this.props.resetEmail]
    );
    const instructionsMsg = gettext(
      'Please follow that link to continue the password reset procedure.'
    );
    const resendMsg = gettext(
      "Didn't receive an email? Check if it was accidentally filtered out as spam, " +
      'or try requesting another copy of the email.'
    );

    return (
      <AuthContent>
        <div className="actions password-reset">
          <p dangerouslySetInnerHTML={{ __html: emailLinkMsg }} />
          <p>{instructionsMsg}</p>
          <hr />
          <p>{resendMsg}</p>
          <div>
            <button
              className="btn btn-primary"
              onClick={ (e) => this.handleResendEmail(e) }
            >
              {gettext('Resend Email')}
            </button>
          </div>
        </div>
      </AuthContent>
    );
  },

});


export default React.PureComponent(RequestPasswordResetSent);

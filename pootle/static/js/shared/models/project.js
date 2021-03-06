/*
 * Copyright (C) Pootle contributors.
 * Copyright (C) Zing contributors.
 *
 * This file is a part of the Zing project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import Backbone from 'backbone';
import _ from 'underscore';

import AdminAPIMixin from 'mixins/admin_api';


export const Project = Backbone.Model.extend({

  defaults: {
    code: '',
    fullname: '',
    checkstyle: 'standard',
    source_language: '',
    screenshot_search_prefix: '',
    disabled: false,
  },

  urlRoot() {
    return '/xhr/admin/projects/';
  },

  getAbsoluteUrl() {
    return `/projects/${this.get('code')}/`;
  },

  getPermissionsUrl() {
    return `/projects/${this.get('code')}/admin/permissions/`;
  },

  getFieldChoices(fieldName) {
    if (this.fieldChoices && this.fieldChoices.hasOwnProperty(fieldName)) {
      return this.fieldChoices[fieldName].map((field) => ({
        // FIXME: react-select's issue #25 prevents using non-string values
        value: field[0].toString(),
        label: field[1],
      }));
    }
    return [];
  },

  toJSON() {
    const attrs = _.clone(this.attributes);
    attrs.disabled = attrs.disabled ? gettext('disabled') : '';
    return attrs;
  },

});


export const ProjectSet = Backbone.Collection.extend(
  _.extend({}, AdminAPIMixin, {

    model: Project,

    url: '/xhr/admin/projects/',

  })
);

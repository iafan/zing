/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import assign from 'object-assign';
import _ from 'underscore';


/* Character mapping/unmapping definitions for the custom font */

const REGULAR_MAP_COMMON = {
  '\u0000': '\u2400',  // NULL
  '\u0007': '\u2407',  // BELL
  '\u0008': '\u2408',  // BS
  '\u0009': '\u2409',  // TAB
  '\u000B': '\u240B',  // VT
  '\u000C': '\u240C',  // FF
  '\u001B': '\u241B',  // ESC
  '\u00A0': '\u2423',  // NBSP
};

const REGULAR_MAP = assign({}, REGULAR_MAP_COMMON, {
  '\u000A': '\u240A\u000A',  // LF (symbol + char)
  '\u000D': '\u240D\u000D',  // CR (symbol + char)
});

const REGULAR_MAP_REV = assign({}, _.invert(REGULAR_MAP_COMMON), {
  '\u240A': '',  // LF
  '\u240D': '',  // CR
});


const NEWLINE_CHARACTERS = ['\u000A', '\u000D'];

const NEWLINE_SYMBOLS = ['\u240A', '\u240D'];


const RAW_MAP_COMMON = {
  '\u0020': '\u2420',  // SPACE

  '\u061C': '\uF000',  // ALM
  '\u200B': '\uF001',  // ZWS
  '\u200C': '\uF002',  // ZWNJ
  '\u200D': '\uF003',  // ZWJ
  '\u200E': '\uF004',  // LRM
  '\u200F': '\uF005',  // RLM
  '\u202A': '\uF006',  // LRE
  '\u202B': '\uF007',  // RLE
  '\u202C': '\uF008',  // PDF
  '\u202D': '\uF009',  // LRO
  '\u202E': '\uF00A',  // RLO
  '\u2060': '\uF00B',  // WJ
  '\u2066': '\uF00C',  // LRI
  '\u2067': '\uF00D',  // RLI
  '\u2068': '\uF00E',  // FSI
  '\u2069': '\uF00F',  // PDI
};

const RAW_MAP = assign({}, REGULAR_MAP, RAW_MAP_COMMON);

const RAW_MAP_REV = assign({}, REGULAR_MAP_REV, _.invert(RAW_MAP_COMMON));


/* Helper to create a regexp for a group of code points */
function makeCodePointRegex(codePointList) {
  return new RegExp(`[${codePointList.join('')}]`, 'g');
}


const REGULAR_MODE_PATTERN = makeCodePointRegex(Object.keys(REGULAR_MAP));
const REGULAR_MODE_PATTERN_REV = makeCodePointRegex(Object.keys(REGULAR_MAP_REV));

const RAW_MODE_PATTERN = makeCodePointRegex(Object.keys(RAW_MAP));
const RAW_MODE_PATTERN_REV = makeCodePointRegex(Object.keys(RAW_MAP_REV));


/* Applies the mapping table for `mode` mode to `value. */
export function applyFontFilter(value, mode = 'regular') {
  // Map characters to mode
  const pattern = mode !== 'raw' ? REGULAR_MODE_PATTERN : RAW_MODE_PATTERN;
  const newValue = value.replace(pattern, (match) => RAW_MAP[match]);

  if (mode === 'raw') {
    return newValue;
  }

  /*
   * Replace extra spaces with the whitespace symbol.
   * This will consider any leading/trailing spaces at the beginning and end of
   * lines, as well as two or more consecutive whitespace characters at any
   * position.
   */
  return newValue.replace(
    /^\u0020+|\u0020+$|\u0020+(?=\u2420$)|\u0020+(?=\u240A$)|\u0020{2,}/mg,
    (match) => new Array(match.length + 1).join('\u2420')
  );
}


/* Reverts the mapping table for `mode` mode from `value. */
export function unapplyFontFilter(value, mode = 'regular') {
  // Unmap characters from mode
  const pattern = mode !== 'raw' ? REGULAR_MODE_PATTERN_REV : RAW_MODE_PATTERN_REV;
  const newValue = value.replace(pattern, (match) => RAW_MAP_REV[match]);

  if (mode === 'raw') {
    return newValue;
  }

  // Remove extra spacing symbols added in `applyFontFilter`.
  return newValue.replace(/\u2420/g, '\u0020');
}


/* Helper to determine whether a character refers to our newline symbol */
export function isNewlineSymbol(char) {
  return NEWLINE_SYMBOLS.indexOf(char) !== -1;
}


/* Counts the number of newline characters present in `value` */
export function countNewlineCharacter(value) {
  return (value.match(makeCodePointRegex(NEWLINE_CHARACTERS)) || []).length;
}


/* Counts the number of newline symbols present in `value` */
export function countNewlineSymbol(value) {
  return (value.match(makeCodePointRegex(NEWLINE_SYMBOLS)) || []).length;
}


/* Removes newline characters from the `value` string */
export function removeNewlineChar(value) {
  return value.replace(makeCodePointRegex(NEWLINE_CHARACTERS), '');
}


/* Converts newline symbols into the characters they refer to */
export function convertNewlineSymbolToChar(value) {
  return value
    .replace(NEWLINE_SYMBOLS[0], NEWLINE_CHARACTERS[0])
    .replace(NEWLINE_SYMBOLS[1], NEWLINE_CHARACTERS[1]);
}
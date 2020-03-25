const getGenFileCaption = require('./getGenFileCaption');

/**
 * get icon component template
 *
 * @param {string} name
 */
module.exports = (name) => `
${getGenFileCaption()}
import React from 'react';

import {ReactComponent as ${name}Component} from './${name}.svg';

import Icon from '../Icon';

export const ${name} = (props) => (
  <Icon {...props}>
    <${name}Component/>
  </Icon>
);

${name}.propTypes = Icon.propTypes;
`;

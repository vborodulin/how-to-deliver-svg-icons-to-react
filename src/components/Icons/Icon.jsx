import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Icon.css';

const Icon = ({children, size = '100', color = 'dark', className}) => {
  return (
    <span className={classNames(
      'icon',
      `icon--size-${size}`,
      `icon--color-${color}`, className)
    }>
      {children}
    </span>
  );
};

Icon.propTypes = {
  size: PropTypes.oneOf('100', '200', '300'),
  color: PropTypes.oneOf('dark', 'light', 'accent'),
  className: PropTypes.string,
};

export default Icon;

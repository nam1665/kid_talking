import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Cube from './../Cube';

import styles from './style.module.scss';

const OverlayLoading = ({ loading, color, target }) => {
    return loading
        ? createPortal(
              <div className={styles.overlay}>
                  <Cube loading color={color} />
              </div>,
              target
          )
        : null;
};

OverlayLoading.defaultProps = {
    target: document.getElementsByTagName('body')[0]
};

OverlayLoading.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string
};

export default OverlayLoading;

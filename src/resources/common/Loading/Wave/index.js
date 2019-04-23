import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Loading = ({ loading, color }) => {
    const style = color
        ? {
              backgroundColor: color
          }
        : {};
    return loading ? (
        <div className={styles.spinner}>
            <div className={styles.rect1} style={style} />
            <div className={styles.rect2} style={style} />
            <div className={styles.rect3} style={style} />
            <div className={styles.rect3} style={style} />
            <div className={styles.rect3} style={style} />
        </div>
    ) : null;
};

Loading.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string
};

export default Loading;

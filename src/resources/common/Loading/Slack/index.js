import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
import cls from 'classnames';
const SlackLoading = ({ loading }) => {
    return loading === true ? (
        <div className={styles.wrap}>
            <div className={cls(styles.dot, styles.dotA)} />
            <div className={cls(styles.dot, styles.dotB)} />
            <div className={cls(styles.dot, styles.dotC)} />
            <div className={cls(styles.dot, styles.dotD)} />
        </div>
    ) : null;
};

SlackLoading.propTypes = {
    loading: PropTypes.bool
};
export default SlackLoading;

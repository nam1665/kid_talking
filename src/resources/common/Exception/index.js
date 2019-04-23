import React, { PureComponent, createElement } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import config from './typeConfig';
import styles from './index.module.scss';

class Exception extends PureComponent {
    static defaultProps = {
        backText: 'back to home'
    };

    render() {
        const { className, backText, linkElement = 'a', type, title, desc, img, actions, ...rest } = this.props;
        const pageType = type in config ? type : '404';
        const clsString = classNames(styles.exception, className);
        return (
            <div className={clsString} {...rest}>
                <div className={styles.imgBlock}>
                    <div className={styles.imgEle} style={{ backgroundImage: `url(${img || config[pageType].img})` }} />
                </div>
                <div className={styles.content}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={styles.desc}>{desc || config[pageType].desc}</div>
                    <div className={styles.actions}>
                        {actions ||
                            createElement(
                                linkElement,
                                {
                                    to: '/',
                                    href: '/'
                                },
                                <Button color="primary">{backText}</Button>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

Exception.propTypes = {
    backText: PropTypes.any,
    linkElement: PropTypes.oneOf(['a', Link]),
    type: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.any,
    img: PropTypes.string,
    className: PropTypes.string,
    actions: PropTypes.any
};

export default Exception;

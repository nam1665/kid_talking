import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

import alertWrapper from 'src/assets/alert-wrapper.png';

class Alert extends React.Component {
    state = {
        show: false
    };

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    };

    render() {
        const { message = 'Are you sure?', okLabel = 'Chắc chắn', cancelLabel = 'Không', onCancel, onOk } = this.props;

        const { show } = this.state;

        if (!show) return null;

        return (
            <React.Fragment>
                <div className={styles.overlay} />
                <div className={styles.wrapper}>
                    <div className="wrapper">
                        <div
                            className={styles.survey}
                            style={{
                                backgroundImage: `url(${alertWrapper})`
                            }}
                        >
                            <div className={styles.content}>
                                <div
                                    className="inner fz-26 text-center"
                                    dangerouslySetInnerHTML={{ __html: message }}
                                />
                            </div>
                            <div className={`${styles.btnWrap} w-100`}>
                                <button
                                    className={`${
                                        styles.btn
                                    } btn-3d btn-pink btn-rounded-20 fz-18 prev text-dark float-left`}
                                    onClick={() => {
                                        this.toggle();

                                        if (onCancel) onCancel();
                                    }}
                                >
                                    <svg
                                        style={{ height: '22px', float: 'left', marginTop: 4 }}
                                        aria-hidden="true"
                                        data-prefix="fas"
                                        data-icon="angle-left"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 512"
                                        className="svg-inline--fa fa-angle-left fa-w-8 fa-2x"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                                            className=""
                                        />
                                    </svg>
                                    <span>{cancelLabel}</span>
                                </button>

                                <button
                                    className={`${
                                        styles.btn
                                    } btn-3d btn-green btn-rounded-20 fz-18 next text-dark float-right`}
                                    onClick={() => {
                                        this.toggle();

                                        if (onOk) onOk();
                                    }}
                                >
                                    <span>{okLabel}</span>
                                    <svg
                                        style={{ height: '22px', float: 'right', marginTop: 4 }}
                                        aria-hidden="true"
                                        data-prefix="fas"
                                        data-icon="angle-right"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 512"
                                        className="svg-inline--fa fa-angle-right fa-w-8"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                                            className=""
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Alert.propTypes = {
    message: PropTypes.string,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default Alert;

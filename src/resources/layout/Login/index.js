import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

class LoginLayout extends PureComponent {
    render() {
        const { children } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
                {/* <img
                    alt="Topica"
                    src="/images/topica.png"
                    style={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        transform: 'rotate(20deg)',
                        width: 200,
                        height: 200
                    }}
                />
                <div className="footer d-flex justify-content-start align-items-center">
                    <span>
                        <img src="/images/congthuong.png" alt="" />
                    </span>
                    <div className="inner">
                        Công ty cổ phần giáo dục Topica English <br />
                        MST: 0106291976 do Sở Kế hoạch và Đầu tư TP.Hà Nội cấp ngày 27 tháng 08 năm 2013 <br />
                        Trụ sở chính: Tầng 3 số 75 Phương Mai, Đống Đa, Hà Nội
                    </div>
                </div> */}
            </div>
        );
    }
}

LoginLayout.propTypes = {
    children: PropTypes.any
};

export default LoginLayout;

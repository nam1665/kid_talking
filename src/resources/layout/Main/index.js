import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authAction from 'src/modules/account/redux/actions/account';
import { stateSelector } from 'src/modules/account/redux/selectors';

class DefaultLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.any,
        authActions: PropTypes.object,
        location: PropTypes.shape({
            pathname: PropTypes.string
        }),
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool
        })
    };

    handleLogout = e => {
        this.props.authActions.logout();
    };
    render() {
        const { children } = this.props;
        return (
            <div>
                {children}
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
                        <img src="https://via.placeholder.com/100x50" />
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

const mapDispatch = dispatch => ({
    authActions: bindActionCreators(authAction, dispatch)
});

export default withRouter(
    connect(
        state => ({
            auth: stateSelector(state)
        }),
        mapDispatch
    )(DefaultLayout)
);

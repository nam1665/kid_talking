import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authAction from 'src/modules/account/redux/actions/account';
import { bindActionToPromise } from 'src/helpers/Common';

import styles from './style.module.css';

class LoginLayout extends PureComponent {
    async _onSubmit(e) {
        e.preventDefault();

        if (!this.usernameField.value) {
            alert('Tên đăng nhập không được để trống.');
            return;
        }

        if (!this.passwordField.value) {
            alert('Password không được để trống.');
            return;
        }

        try {
            await this.props.loginAction({
                username: this.usernameField.value,
                password: this.passwordField.value,
                isRemember: this.rememberField.checked
            });
        } catch (e) {
            e.message ? alert(e.message) : alert(e.data.message);
        }
    }

    _onChange(e) {
        if (this.usernameField.value.length > 0 && this.passwordField.value.length > 0) {
            this.loginButton.removeAttribute('disabled');
            this.loginButton.classList.remove('disabled');
        } else {
            this.loginButton.setAttribute('disabled', true);
            this.loginButton.classList.add('disabled');
        }
    }

    render() {
        return (
            <Fragment>
                <Helmet title="Login" />
                <div className="login-register-wrap">
                    <div className="login-register">
                        <img alt="Demo" src="https://i.imgur.com/jZkJzig.png" />

                        <Form className="form" onSubmit={this._onSubmit.bind(this)}>
                            <FormGroup>
                                <Input
                                    placeholder="Username..."
                                    name="username"
                                    bssize="lg"
                                    innerRef={e => (this.usernameField = e)}
                                    onChange={this._onChange.bind(this)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    placeholder="Secret code..."
                                    type="password"
                                    name="password"
                                    bssize="lg"
                                    innerRef={e => (this.passwordField = e)}
                                    onChange={this._onChange.bind(this)}
                                />
                            </FormGroup>

                            <label className="checkbox-label">
                                Remember me
                                <input
                                    name="remember"
                                    id="remember"
                                    className="form-check-input"
                                    type="checkbox"
                                    ref={e => (this.rememberField = e)}
                                />
                                <span className="checkmark" />
                            </label>

                            <Button
                                type="submit"
                                color="primary"
                                block
                                bssize="lg"
                                onClick={this._onSubmit.bind(this)}
                                innerRef={e => (this.loginButton = e)}
                                disabled
                            >
                                {`Let's Go`}
                            </Button>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

LoginLayout.propTypes = {
    loginAction: PropTypes.func
};

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        loginAction: bindActionToPromise(dispatch, authAction.login)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginLayout);

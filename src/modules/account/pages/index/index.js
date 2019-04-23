import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class AccountContainer extends PureComponent {
    render() {
        return (
            <Fragment>
                <Helmet title="Account" />
            </Fragment>
        );
    }
}

AccountContainer.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

export default connect(mapStateToProps)(AccountContainer);

import React from 'react';
import PropTypes from 'prop-types';
import Bounce from './Bounce';
import Cube from './Cube';
import Overlay from './Overlay';
import Slack from './Slack';
import Wave from './Wave';

const BaseLoading = ({ type, ...rest }) => {
    switch (type) {
        case 'bounce':
            return <Bounce {...rest} />;
        case 'cube':
            return <Cube {...rest} />;
        case 'overlay':
            return <Overlay {...rest} />;
        case 'wave':
            return <Wave {...rest} />;

        default:
            return <Slack {...rest} />;
    }
};

BaseLoading.defaultProps = {
    loading: true,
    type: 'cube'
};

BaseLoading.propTypes = {
    type: PropTypes.oneOf(['slack', 'cube', 'bounce', 'wave', 'overlay']),
    loading: PropTypes.bool,
    color: PropTypes.string
};

export default BaseLoading;

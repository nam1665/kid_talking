import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TruncateComponent = memo(({ text, length, separator, omission }) => {
    const textTruncate = _.truncate(text, {
        length: length,
        separator: separator,
        omission: omission
    });
    return <span>{textTruncate}</span>;
});

TruncateComponent.defaultProps = {
    text: '',
    length: 50,
    separator: '',
    omission: '...'
};

TruncateComponent.propTypes = {
    text: PropTypes.string,
    length: PropTypes.number.isRequired,
    separator: PropTypes.any,
    omission: PropTypes.string
};

export default TruncateComponent;

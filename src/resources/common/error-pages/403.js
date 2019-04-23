import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Exception from 'src/resources/common/Exception';

const Exception403 = () => (
    <Exception
        type="403"
        desc={
            <FormattedMessage
                id="app.exception.description.403"
                defaultMessage="Sorry, you don't have access to this page"
            />
        }
        linkElement={Link}
        backText={<FormattedMessage id="app.exception.back" defaultMessage="Back to home" />}
    />
);

export default Exception403;

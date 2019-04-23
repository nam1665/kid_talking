import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Exception from 'src/resources/common/Exception';

const Exception500 = () => (
    <Exception
        type="500"
        desc={
            <FormattedMessage
                id="app.exception.description.500"
                defaultMessage="Sorry, the server is reporting an error"
            />
        }
        linkElement={Link}
        backText={<FormattedMessage id="app.exception.back" defaultMessage="Back to home" />}
    />
);

export default Exception500;

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Exception from 'src/resources/common/Exception';

const Exception404 = () => (
    <Exception
        type="404"
        desc={
            <FormattedMessage
                id="app.exception.description.404"
                defaultMessage="Sorry, the page you visited does not exist"
            />
        }
        linkElement={Link}
        backText={<FormattedMessage id="app.exception.back" defaultMessage="Back to home" />}
    />
);

export default Exception404;

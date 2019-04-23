import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
    state = {
        blob: null,
        error: false
    };

    async componentDidMount() {
        let { blob, error } = this.state;

        try {
            blob = await this._getImage();
        } catch (e) {
            error = true;
        }

        this.setState({
            blob,
            error
        });
    }

    _getImage = async () => {
        const url = window.URL || window.webkitURL;
        const { src } = this.props;

        const request = await fetch(src);
        const blobObject = await request.blob();

        return url.createObjectURL(blobObject);
    };

    render() {
        const { blob } = this.state;

        const { src, ...rest } = this.props;

        if (!blob) {
            return null;
        }

        return <img src={blob} {...rest} />;
    }
}

Image.propTypes = {
    src: PropTypes.string.isRequired
};

export default Image;

import React from 'react';
import PropTypes from 'prop-types';

class Droppable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this.classes = this.classes.bind(this);
    }

    classes() {
        return [this.state.hover ? 'hover' : '', this.props.className];
    }

    render() {
        const { onDrop, onHover, onUnHover, children, style, tag: Component } = this.props;

        return (
            <Component
                className={this.classes().join(' ')}
                onMouseEnter={() => {
                    this.setState({
                        hover: true
                    });

                    if (onHover) onHover();
                }}
                onMouseLeave={() => {
                    this.setState({
                        hover: false
                    });

                    if (onUnHover) onUnHover();
                }}
                onMouseUp={onDrop}
                style={style}
            >
                {children}
            </Component>
        );
    }
}

Droppable.propTypes = {
    className: PropTypes.string,
    onDrop: PropTypes.func,
    children: PropTypes.any,
    onHover: PropTypes.func,
    onUnHover: PropTypes.func,
    style: PropTypes.object,
    tag: PropTypes.string
};

export default Droppable;

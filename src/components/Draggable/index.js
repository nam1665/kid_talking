import React from 'react';
import PropTypes from 'prop-types';

const LEFT_MOUSE = 0;
const DRAG_THRESHOLD = 3;

/**
 * Draggable Component
 */
class Draggable extends React.Component {
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.style = this.style.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);

        this.state = {
            mouseDown: false,
            dragging: false,
            originX: 0,
            originY: 0,
            elementX: 0,
            elementY: 0,
            clientY: 0,
            clientX: 0
        };
    }

    /**
     * Handle onUpdate
     */
    componentDidUpdate() {
        if (this.props.onUpdate) {
            this.props.onUpdate(this.dragElem);
        }
    }

    /**
     * Handle khi chuột được click vào element
     *
     * @param {object} e
     */
    onMouseDown(e) {
        if (e.button == LEFT_MOUSE) {
            e.stopPropagation();
            this.addEvent();
            this.setState({
                mouseDown: true,
                originX: e.pageX,
                originY: e.pageY,
                elementX: this.dragElem.offsetLeft,
                elementY: this.dragElem.offsetTop
            });
        }
    }

    /**
     * Handle khi chuột trái vẫn giữ và bắt đầu di chuyển element
     *
     * @param {object} e
     */
    onMouseMove(e) {
        const { originX, originY, dragging, elementX, elementY } = this.state;

        const deltaX = e.pageX - originX;
        const deltaY = e.pageY - originY;
        const distance = Math.abs(deltaX) + Math.abs(deltaY);

        if (!dragging && distance > DRAG_THRESHOLD) {
            this.setState(
                {
                    dragging: true
                },
                () => {
                    if (this.props.onDragStart) {
                        this.props.onDragStart(e);
                    }
                }
            );
        }

        if (dragging) {
            this.setState(
                {
                    left: elementX + deltaX + document.body.scrollLeft,
                    top: elementY + deltaY + document.body.scrollTop,
                    clientX: e.clientX,
                    clientY: e.clientY
                },
                () => {
                    if (this.props.onDragging)
                        this.props.onDragging(
                            {
                                originX: this.state.originX,
                                originY: this.state.originY,
                                clientX: e.clientX,
                                clientY: e.clientY
                            },
                            this.dragElem
                        );
                }
            );
        }
    }

    /**
     * Handle khi thả element
     *
     * @param {object} e
     */
    onMouseUp(e) {
        this.removeEvent();
        if (this.state.dragging) {
            if (this.props.onDragStop) {
                this.props.onDragStop(this.dragElem);
            }
            this.setState({
                mouseDown: false,
                dragging: false
            });
        }
    }

    /**
     * Add những mouse event
     */
    addEvent() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    /**
     * Xóa những mouse event
     */
    removeEvent() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    /**
     * Thêm default style cho element
     */
    style() {
        return this.state.dragging
            ? {
                  position: 'absolute',
                  left: this.state.left,
                  top: this.state.top,
                  pointerEvents: 'none'
              }
            : {};
    }

    /**
     * Render element
     */
    render() {
        const { children, className, tag: Component, style, innerRef } = this.props;
        const styles = this.style();

        return (
            <Component
                ref={e => {
                    this.dragElem = e;
                    if (innerRef) innerRef(e);
                }}
                className={className}
                onMouseDown={this.onMouseDown.bind(this)}
                style={{ ...styles, ...style }}
            >
                {children}
            </Component>
        );
    }
}

Draggable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    onDragging: PropTypes.func,
    tag: PropTypes.string,
    style: PropTypes.object,
    innerRef: PropTypes.any
};

export default Draggable;

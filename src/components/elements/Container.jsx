import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
var move_count = 0;


class Container extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
    this.student_move_answer = this.student_move_answer.bind(this);

    this.state = {
      student_move: false,
      drag_finish: false,
      move_counter: 0,
      boxes: {
        a: { top: 0, left: 10 }
      },
    }
  }
  state = {
    background_img: '',
    object_img: '',
    left_larger: 10,
    left_smaller: 100,
    top_larger: 20,
    top_smaller: 500
  };

  componentWillReceiveProps(){
    this.setState({
      background_img: this.props.background_img,
      object_img: this.props.object_img,
      left_larger: this.props.left_larger,
      left_smaller: this.props.left_smaller,
      top_larger: this.props.top_larger,
      top_smaller: this.props.top_smaller
    });

  }
  render() {
    const styles = {
      width: 800,
      height: 500,
      border: '1px solid black',
      position: 'relative',
      backgroundImage: "url(" + this.state.background_img + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes } = this.state;
    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map(key => {
          const { left, top } = boxes[key]
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              <img src={this.state.object_img} alt="" style={{ width: 50, position:'absolute' }} />
              <button style={{display: 'none'}} onClick={this.handleClick}></button>
              <button style={{display: 'none'}} onClick={this.student_move_answer}></button>

            </Box>

          )
        })}
      </div>

    )

  }

  handleClick () {
    this.props.action(this.state.move_counter);
    this.setState({
      move_counter: this.state.move_counter
    });
  }

  student_move_answer () {
    this.props.action2(this.state.student_move);
    this.setState({
      student_move: this.state.student_move,
    });
  }



  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    );
    if(move_count == 3){
      move_count = 0;
    } else {
      move_count += 1;
    }
    if (left > this.state.left_larger && left < this.state.left_smaller){
      if(top > this.state.top_larger && top < this.state.top_smaller){
        this.setState({
          student_move: true
        });
      }
    }
    else {
      this.setState({
        student_move: false
      });
    }
    this.setState({
      move_counter: move_count
    });
    this.handleClick();
    this.student_move_answer()

    console.log(left + "   " + top)

  }

}

export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      const item = monitor.getItem();
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      component.moveBox(item.id, left, top)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Container)

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
    this.studen_reset_move = this.studen_reset_move.bind(this);

    this.state = {
      student_move: false,
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
    top_smaller: 500,
    drag_finish: false
  };

  componentWillReceiveProps(){
    this.setState({
      background_img: this.props.background_img,
      object_img: this.props.object_img,
      left_larger: this.props.left_larger,
      left_smaller: this.props.left_smaller,
      top_larger: this.props.top_larger,
      top_smaller: this.props.top_smaller,
      reset_move: this.props.reset_move

    });
    console.log(this.state.reset_move);
    if(this.state.reset_move){
      move_count = 0;
    }

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
              <button style={{display: 'none'}} onClick={this.studen_reset_move}></button>

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

  studen_reset_move () {
    this.props.action3(this.state.reset_move);
    this.setState({
      reset_move: false,
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


    if (left > this.state.left_larger && left < this.state.left_smaller){
      if(top > this.state.top_larger && top < this.state.top_smaller){
        this.setState({
          student_move: true
        });
      }
      else{
        this.setState({
          student_move: false
        });
      }
    }
    else {
      this.setState({
        student_move: false
      });
    }

    move_count += 1;

    this.setState({
      reset_move: false,
    });

    if(move_count > 3 ){
      move_count = 0;
    }

    this.setState({
      move_counter: move_count,
    });

    this.handleClick();
    this.student_move_answer();

    if(this.state.reset_move){
      this.studen_reset_move();
    }

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

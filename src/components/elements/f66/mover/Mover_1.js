import React from 'react';
import DefaultLayout from '../../DefaultLayout';
import _ from 'lodash';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';

class Mover_1 extends React.Component {
    state = {
        answers: [
            {
                name: 'Marry',
                color: 'organge',
                show: true
            },
            {
                name: 'Jim',
                color: 'green',
                show: true
            },
            {
                name: 'Vicky',
                color: 'red',
                show: true
            },
            {
                name: 'Fred',
                color: 'purple',
                show: true
            },
            {
                name: 'Paul',
                color: 'blue',
                show: true
            },
            {
                name: 'Daisy',
                color: 'yellow',
                show: true
            },
            {
                name: 'Jack',
                color: 'pink',
                show: true
            }
        ],
        currentItem: null
    };

    constructor(props) {
        super(props);

        this.connection = {};
        this.dragItems = {};
        this.holdItem = {};

        this.onDragStop = this.onDragStop.bind(this);
        this.onDragging = this.onDragging.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragging(e, elem, i) {
        if (elem) {
            const bounce = elem.getBoundingClientRect();

            this.connection[i].setAttribute('x2', bounce.left + bounce.width / 2);
            this.connection[i].setAttribute('y2', bounce.top + bounce.width / 2);
        }
    }

    onDragStart(currentItem) {
        const { answers } = this.state;

        answers[currentItem].dragging = true;

        this.holdItem[currentItem].classList.remove('d-none');
        const bounce = this.holdItem[currentItem].getBoundingClientRect();
        this.connection[currentItem].setAttribute('x1', bounce.left + bounce.width / 2);
        this.connection[currentItem].setAttribute('y1', bounce.top + bounce.height / 2);

        this.setState(
            {
                answers,
                currentItem,
                isDragging: true
            },
            () => {}
        );
    }

    onDragStop(currentItem) {
        const { answers } = this.state;

        delete answers[currentItem].dragging;

        // this.holdItem[currentItem].classList.add('d-none');

        this.setState({
            answers,
            currentItem: null
        });
    }

    onDrop(item) {
        const { currentItem, answers } = this.state;

        if (currentItem === null) {
            return;
        }

        const index = _.findIndex(answers, o => {
            return o && Number(item) == Number(o.answer);
        });

        if (index > -1) {
            delete answers[index].answer;
        } else if (answers[currentItem].answer != undefined) {
            if (this.connection[index]) {
                const elem = this.dragItems[index];

                if (elem) {
                    const bounce = elem.getBoundingClientRect();
                    this.connection[answers[item].answer].setAttribute('x1', bounce.left + bounce.width / 2);
                    this.connection[answers[item].answer].setAttribute('y2', bounce.top + bounce.height / 2);
                }
            }
        }

        // if (index > -1) {
        //     if (answers[item].answer != undefined) {
        //         answers[currentItem].answer = item;
        //     } else {
        //         delete answers[currentItem].answer;
        //     }
        // } else if (answers[currentItem].answer != undefined) {
        //     if (this.connection[answers[item].answer]) {
        //         const elem = this.dragItems[answers[item].answer];

        //         if (elem) {
        //             const bounce = elem.getBoundingClientRect();
        //             this.connection[answers[item].answer].setAttribute('x1', bounce.left + bounce.width / 2);
        //             this.connection[answers[item].answer].setAttribute('y2', bounce.top + bounce.height / 2);
        //         }
        //     }
        // }

        answers[currentItem].answer = item;
        answers[currentItem].show = false;

        this.setState({
            answers
        });
    }

    render() {
        const { answers } = this.state;
        return (
            <DefaultLayout>
                <div className="typeFifteen w-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <div
                                    className="image-wrap ml-auto mr-auto noselect"
                                    style={{ width: 400, height: 480 }}
                                >
                                    <img
                                        src="/images/homework/test-1/pic1.png"
                                        style={{ width: 400 }}
                                        alt=""
                                        draggable={false}
                                        className="noslect"
                                    />
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(item => {
                                        const index = _.findIndex(answers, o => {
                                            return o && Number(item) == Number(o.answer);
                                        });

                                        return (
                                            <Droppable
                                                tag="span"
                                                className={`dragzone dragzone-${item}`}
                                                key={item}
                                                onDrop={() => {
                                                    this.onDrop(item);
                                                }}
                                            >
                                                {index > -1 && answers[index].answer >= 0 && (
                                                    <Draggable
                                                        tag="span"
                                                        className={`answer-point answer-${
                                                            answers[index].color
                                                        } noselect`}
                                                        innerRef={e => {
                                                            this.dragItems[answers[index].answer] = e;
                                                        }}
                                                        onDragStart={() => {
                                                            this.onDragStart(index);
                                                        }}
                                                        onDragging={(e, elem) => {
                                                            this.onDragging(e, elem, item);
                                                        }}
                                                        onDragStop={() => {
                                                            this.onDragStop(item);
                                                        }}
                                                    />
                                                )}
                                            </Droppable>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-3 text-right order-first">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {[0, 1, 2, 3].map(item => {
                                        return (
                                            <React.Fragment key={item}>
                                                <div className="answer">
                                                    {answers[item].name}
                                                    <span
                                                        className={`answer-point answer-${
                                                            answers[item].color
                                                        } noselect d-none`}
                                                        ref={e => (this.holdItem[item] = e)}
                                                    />
                                                    {answers[item].show && (
                                                        <Draggable
                                                            tag="span"
                                                            className={`answer-point answer-${
                                                                answers[item].color
                                                            } noselect`}
                                                            innerRef={e => {
                                                                this.dragItems[item] = e;
                                                            }}
                                                            onDragStart={() => {
                                                                this.onDragStart(item);
                                                            }}
                                                            onDragStop={() => {
                                                                this.onDragStop(item);
                                                            }}
                                                            onDragging={(e, elem) => {
                                                                this.onDragging(e, elem, item);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-3 text-left">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {[4, 5, 6].map(item => {
                                        return (
                                            <React.Fragment key={item}>
                                                <div className="answer">
                                                    {answers[item].name}
                                                    <span
                                                        className={`answer-point answer-${
                                                            answers[item].color
                                                        } noselect d-none`}
                                                        ref={e => (this.holdItem[item] = e)}
                                                    />
                                                    {answers[item].show && (
                                                        <Draggable
                                                            tag="span"
                                                            className={`answer-point answer-${
                                                                answers[item].color
                                                            } noselect`}
                                                            innerRef={e => {
                                                                this.dragItems[item] = e;
                                                            }}
                                                            onDragStart={() => {
                                                                this.onDragStart(item);
                                                            }}
                                                            onDragStop={() => {
                                                                this.onDragStop(item);
                                                            }}
                                                            onDragging={(e, elem) => {
                                                                this.onDragging(e, elem, item);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                    {/* <div className="answer">
                                Marry <span className="answer-point answer-orange" />
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {[0, 1, 2, 3, 4, 5, 6].map(item => {
                    return (
                        <svg className="typeSix lineConnect" key={item}>
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="0"
                                className={answers[item].color}
                                ref={e => (this.connection[item] = e)}
                            />
                        </svg>
                    );
                })}
            </DefaultLayout>
        );
    }
}

export default Mover_1;

import React from 'react';
import DefaultLayout from '../../DefaultLayout';
import _ from 'lodash';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';
import BaseLayer from './Base.js'

class StarterOne extends BaseLayer {
    state = {
        answers: [
            {
                name: 'Matt',
                color: 'oranges',
                show: true,
                t: 6
            },
            {
                name: 'Tom',
                color: 'green',
                show: true,
                t: -1
            },
            {
                name: 'Hugo',
                color: 'red',
                show: true,
                answer: 2,
                default: true
            },
            {
                name: 'Lucy',
                color: 'violet',
                show: true,
                t: 4
            },
            {
                name: 'Sue',
                color: 'blue',
                show: true,
                t: 5
            },
            {
                name: 'Jill',
                color: 'yellow',
                show: true,
                t: 8
            },
            {
                name: 'Alex',
                color: 'pink',
                show: true,
                t: 7
            }
        ],
        currentItem: null,
        isDropping: false,
        currentSound: 0,
        totalSound: 0
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

    UNSAFE_componentWillMount() {
        const {
            attachments: { sound },
            q_text
        } = this.props;

        console.log(sound);

        if (sound && sound.length > 0) {
            this.setState({
                totalSound: 5
            });
        }
    }
    nextQuestion(){
        this.setDefault();
        let correct = true;
        let point = 5;

        const answer = [];

        _.forEach(this.state.answers, o => {
            if (o.t && o.t > -1) {
                if (o.t != o.answer) {
                    correct = false;
                    point = point - 1;
                    answer.push(`${o.name}:${o.answer}:false`);
                } else {
                    answer.push(`${o.name}:${o.answer}:true`);
                }
            }
        });

        this.props.onNext({
            answer: answer,
            correct: correct,
            fraction: point
        });
    }
    componentDidMount() {
        this.timeout = setTimeout(() => {
            const elem = this.connection[2];
            const dragElem = this.dragItems[2];
            const dropElem = this.holdItem[2];

            if (elem && dragElem && dropElem) {
                const bounceDrag = dragElem.getBoundingClientRect();
                const bounceDrop = dropElem.getBoundingClientRect();

                elem.setAttribute('x1', bounceDrop.left + bounceDrop.width / 2);
                elem.setAttribute('y1', bounceDrop.top + bounceDrop.height / 2);
                elem.setAttribute('x2', bounceDrag.left + bounceDrag.width / 2);
                elem.setAttribute('y2', bounceDrag.top + bounceDrag.height / 2);
            }
        }, 100);
        console.log(3);

        this.status_wait = true;
        this.wait(300000);
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.timeout2) {
            clearTimeout(this.timeout2);
        }
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
        this.connection[currentItem].setAttribute('x2', bounce.left + bounce.width / 2);
        this.connection[currentItem].setAttribute('y2', bounce.top + bounce.height / 2);

        this.setState({
            answers,
            currentItem,
            isDragging: true
        });
    }

    onDragStop(currentItem, elem) {
        const { answers, isDropping } = this.state;

        if (!isDropping && !answers[currentItem].answer) {
            elem.classList.remove('active');
            const elem1 = document.getElementById(`dragzone-${currentItem}`);
            if (elem1) {
                elem1.classList.remove('active');
            }
            this.connection[currentItem].setAttribute('x1', 0);
            this.connection[currentItem].setAttribute('y1', 0);
            this.connection[currentItem].setAttribute('x2', 0);
            this.connection[currentItem].setAttribute('y2', 0);
            this.holdItem[currentItem].classList.add('d-none');
        } else {
            this.timeout2 = setTimeout(() => {
                const elem2 = this.dragItems[currentItem];

                if (elem2) {
                    const bounce = elem2.getBoundingClientRect();

                    this.connection[currentItem].setAttribute('x2', bounce.left + bounce.width / 2);
                    this.connection[currentItem].setAttribute('y2', bounce.top + bounce.height / 2);
                }
            }, 1);
        }

        delete answers[currentItem].dragging;

        this.setState({
            answers,
            currentItem: null,
            isDragging: false,
            isDropping: false
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

        if (answers[index] && answers[index].answer == item) {
            delete answers[index].answer;
            if (this.connection[index]) {
                const elem = this.dragItems[index];

                if (elem) {
                    const bounce = elem.getBoundingClientRect();
                    this.connection[index].setAttribute('x1', bounce.left + bounce.width / 2);
                    this.connection[index].setAttribute('y1', bounce.top + bounce.height / 2);
                }
            }
        }

        answers[currentItem].answer = item;

        this.setState({
            answers,
            isDroping: true
        });

        if (this.state.answers.filter(o => o.answer).length == this.state.totalSound) {
            this.send(this.trigger_confirm);
        }

    }

    renderDraggable(answer, index) {
        if (answer.default) {
            return (
                <span
                    className={`answer-point answer-${answer.color} noselect`}
                    ref={e => {
                        this.dragItems[index] = e;
                    }}
                />
            );
        }

        return (
            <Draggable
                tag="span"
                className={`answer-point answer-${answer.color} noselect`}
                innerRef={e => {
                    this.dragItems[index] = e;
                }}
                onDragStart={() => {
                    this.onDragStart(index);
                }}
                onDragStop={elem => {
                    this.onDragStop(index, elem);
                }}
                onDragging={(e, elem) => {
                    this.onDragging(e, elem, index);
                }}
            />
        );
    }

    renderSuperDraggable(answer, item) {
        if (answer.default) {
            return null;
        }

        if (!answer.answer) {
            return (
                <Draggable
                    tag="span"
                    className={`answer-point answer-${answer.color} noselect`}
                    innerRef={e => {
                        this.dragItems[item] = e;
                    }}
                    onDragStart={() => {
                        this.onDragStart(item);
                    }}
                    onDragStop={elem => {
                        this.onDragStop(item, elem);
                    }}
                    onDragging={(e, elem) => {
                        this.onDragging(e, elem, item);
                    }}
                />
            );
        }

        return null;
    }

    render() {
        const {
            onNext,
            q_audio,
            q_picture,
            attachments: { sound },
            ...rest
        } = this.props;
        const { answers, totalSound } = this.state;
        let { currentSound } = this.state;

        return (
            <DefaultLayout
                title="Listen and draw lines"
                {...rest}
                q_audio={sound && sound[currentSound] ? sound[currentSound] : null}
                showModel={answers.filter(o => o.answer).length < totalSound}
                alertMessage={`Còn ${answers.filter(o => !o.answer).length -
                    1} phần nối dây chưa làm xong, bạn chắc chắn muốn chuyển tới phần sau?`}
                onSoundEnded={() => {
                    currentSound = currentSound + 1;

                    console.log(totalSound);
                    console.log(currentSound);

                    if (currentSound < totalSound) {
                        this.nextAudioTimeout = setTimeout(
                            () => {
                                this.setState(
                                    {
                                        currentSound: currentSound
                                    },
                                    () => {
                                        if (this.nextAudioTimeout) clearTimeout(this.nextAudioTimeout);
                                    }
                                );
                            },
                            currentSound === 1 ? 2000 : 10000
                        );
                    }
                }}
                handleAudioButton={() => {
                    this.setState({
                        currentSound: 0
                    });
                }}
                onNext={() => {
                    this.nextQuestion();
                }}
            >
                <div className="typeFifteen w-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <div
                                    className="image-wrap ml-auto mr-auto noselect"
                                    style={{ width: 400, height: 480 }}
                                >
                                    {this._javisrender()}   
                                    <img
                                        src={q_picture}
                                        style={{ width: 450 }}
                                        alt=""
                                        draggable={false}
                                        className="noslect"
                                    />
                                    {[2, 3, 4, 5, 6, 7, 8].map(item => {
                                        const index = _.findIndex(answers, o => {
                                            return o && Number(item) == Number(o.answer);
                                        });

                                        if (item == 2) {
                                            return (
                                                <span className={`dragzone dragzone-${item}`} key={item}>
                                                    {index > -1 &&
                                                        answers[index].answer >= 0 &&
                                                        this.renderDraggable(answers[index], index)}
                                                </span>
                                            );
                                        }

                                        return (
                                            <Droppable
                                                tag="span"
                                                id={`dragzone-${item}`}
                                                className={`dragzone dragzone-${item} ${this.state.isDragging &&
                                                    'active'}`}
                                                key={item}
                                                onDrop={() => {
                                                    this.onDrop(item);
                                                }}
                                                onHover={() => {
                                                    this.setState({
                                                        isDropping: true
                                                    });
                                                }}
                                                onUnHover={() => {
                                                    this.setState({
                                                        isDropping: false
                                                    });
                                                }}
                                            >
                                                {index > -1 &&
                                                    answers[index].answer >= 0 &&
                                                    this.renderDraggable(answers[index], index)}
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
                                                        } noselect ${
                                                            answers[item].answer || answers[item].default
                                                                ? ''
                                                                : 'd-none'
                                                        }`}
                                                        ref={e => (this.holdItem[item] = e)}
                                                    />
                                                    {this.renderSuperDraggable(answers[item], item)}
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
                                                        } noselect ${
                                                            answers[item].answer || answers[item].default
                                                                ? ''
                                                                : 'd-none'
                                                        }`}
                                                        ref={e => (this.holdItem[item] = e)}
                                                    />
                                                    {this.renderSuperDraggable(answers[item], item)}
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
                    const x1 = 0,
                        x2 = 0,
                        y1 = 0,
                        y2 = 0;

                    return (
                        <svg className="typeSix lineConnect" key={item}>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
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

export default StarterOne;

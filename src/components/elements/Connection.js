import React from 'react';
import _ from 'lodash';
import HomeworkLayout from './HomeworkLayout';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';

const color = ['green', 'oranges', 'violet', 'blue', 'red', 'yellow'];

class Connection extends React.Component {
    state = {
        rowOne: [],
        rowTwo: [],
        isDropping: false,
        isDragging: false
    };

    constructor(props) {
        super(props);

        this.connection = {};
        this.rowOne = {};
        this.dragItems = {};
    }

    UNSAFE_componentWillMount() {
        const { data } = this.props;

        this.setState({
            rowOne: data
                .map((item, index) => {
                    return {
                        text: item.question,
                        group: index
                    };
                })
                .sort(() => Math.random() - 0.5),
            rowTwo: data
                .map((item, index) => {
                    return {
                        text: item.answer,
                        group: index
                    };
                })
                .sort(() => Math.random() - 0.5)
        });
    }

    onDrop(i) {
        const { currentItem, rowTwo } = this.state;

        if (currentItem == null) {
            return;
        }

        const index = _.findIndex(rowTwo, o => {
            return o && Number(currentItem) == Number(o.rowOneIndex);
        });

        if (index > -1) {
            if (rowTwo[i].rowOneIndex != undefined) {
                rowTwo[index].rowOneIndex = rowTwo[i].rowOneIndex;
            } else {
                delete rowTwo[index].rowOneIndex;
            }
        } else if (rowTwo[i].rowOneIndex != undefined) {
            if (this.connection[rowTwo[i].rowOneIndex]) {
                const elem = this.dragItems[rowTwo[i].rowOneIndex];

                if (elem) {
                    const bounce = elem.getBoundingClientRect();
                    this.connection[rowTwo[i].rowOneIndex].setAttribute('x1', bounce.left + bounce.width / 2);
                    this.connection[rowTwo[i].rowOneIndex].setAttribute('y1', bounce.top + bounce.height / 2);
                }
            }
        }

        rowTwo[i].rowOneIndex = currentItem;

        this.setState({
            rowTwo
        });
    }

    _renderRow() {
        const { rowOne, rowTwo, data } = this.state;

        const total = rowOne.length;

        const output = [];

        let col = '3';

        for (let i = 0; i < rowTwo.length; i++) {
            if (rowTwo[i].text.length > 15) {
                col = '7';
            }
        }

        for (let i = 0; i < total; i++) {
            output.push(
                <div className="row group justify-content-between align-items-center" key={i}>
                    <div className="col-md-3">
                        <div className="dragWrap">
                            <div className="content noselect">{rowOne[i].text}</div>
                            <div id={`dragItem-${i}`} className={`drag ${color[i]}`} ref={e => (this.rowOne[i] = e)} />
                            {_.findIndex(rowTwo, o => {
                                if (o && o.rowOneIndex != undefined && o.rowOneIndex == i) return true;
                                return false;
                            }) == -1 && (
                                <Draggable
                                    tag="div"
                                    className={`drag ${color[i]}`}
                                    innerRef={e => (this.dragItems[i] = e)}
                                    onDragStart={e => {
                                        const elem = document.getElementById(`dragItem-${i}`);

                                        if (elem) {
                                            const bounce = elem.getBoundingClientRect();
                                            this.connection[i].setAttribute('x1', bounce.left + bounce.width / 2);
                                            this.connection[i].setAttribute('y1', bounce.top + bounce.height / 2);
                                        }
                                        e.target.classList.add('active');
                                        document.getElementById(`dragItem-${i}`).classList.add('active');
                                        this.setState({
                                            currentItem: i,
                                            isDragging: true
                                        });
                                    }}
                                    onDragStop={elem => {
                                        if (!this.state.isDropping) {
                                            elem.classList.remove('active');
                                            document.getElementById(`dragItem-${i}`).classList.remove('active');
                                            this.connection[i].setAttribute('x1', 0);
                                            this.connection[i].setAttribute('y1', 0);
                                            this.connection[i].setAttribute('x2', 0);
                                            this.connection[i].setAttribute('y2', 0);
                                        } else {
                                            const { currentItem } = this.state;

                                            const elem = this.dragItems[currentItem];

                                            if (elem) {
                                                const bounce = elem.getBoundingClientRect();

                                                this.connection[currentItem].setAttribute(
                                                    'x2',
                                                    bounce.left + bounce.width / 2
                                                );
                                                this.connection[currentItem].setAttribute(
                                                    'y2',
                                                    bounce.top + bounce.height / 2
                                                );
                                            }
                                        }

                                        this.setState({
                                            currentItem: null,
                                            isDragging: false,
                                            isDropping: false
                                        });
                                    }}
                                    onDragging={(e, elem) => {
                                        const bounce = elem.getBoundingClientRect();
                                        this.connection[i].setAttribute('x2', bounce.left + bounce.width / 2);
                                        this.connection[i].setAttribute('y2', bounce.top + bounce.height / 2);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className={`col-md-${col}`}>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <Droppable
                                tag="div"
                                className={`dropBase ${this.state.isDragging && 'spin'}`}
                                onDrop={() => {
                                    this.onDrop(i);
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
                            />
                            {rowTwo[i].rowOneIndex >= 0 && (
                                <Draggable
                                    tag="div"
                                    className={`drag ${color[rowTwo[i].rowOneIndex]} active`}
                                    innerRef={e => {
                                        this.dragItems[rowTwo[i].rowOneIndex] = e;
                                        this.dragItems[rowTwo[i].rowOneIndex] = e;
                                    }}
                                    style={
                                        this.state.isDragging
                                            ? {
                                                  pointerEvents: 'none'
                                              }
                                            : {}
                                    }
                                    onDragStart={e => {
                                        this.setState({
                                            currentItem: rowTwo[i].rowOneIndex,
                                            isDragging: true
                                        });
                                    }}
                                    onDragStop={() => {
                                        const { currentItem } = this.state;

                                        setTimeout(() => {
                                            const elem = this.dragItems[currentItem];

                                            if (elem) {
                                                const bounce = elem.getBoundingClientRect();

                                                this.connection[currentItem].setAttribute(
                                                    'x2',
                                                    bounce.left + bounce.width / 2
                                                );
                                                this.connection[currentItem].setAttribute(
                                                    'y2',
                                                    bounce.top + bounce.height / 2
                                                );
                                            }
                                        }, 1);

                                        this.setState({
                                            currentItem: null,
                                            isDragging: false,
                                            isDropping: false
                                        });
                                    }}
                                    onDragging={(e, elem) => {
                                        if (this.connection[rowTwo[i].rowOneIndex]) {
                                            const bounce = elem.getBoundingClientRect();
                                            this.connection[rowTwo[i].rowOneIndex].setAttribute(
                                                'x2',
                                                bounce.left + bounce.width / 2
                                            );
                                            this.connection[rowTwo[i].rowOneIndex].setAttribute(
                                                'y2',
                                                bounce.top + bounce.height / 2
                                            );
                                        }
                                    }}
                                    onUpdate={elem => {
                                        if (this.connection[rowTwo[i].rowOneIndex]) {
                                            const bounce = elem.getBoundingClientRect();
                                            this.connection[rowTwo[i].rowOneIndex].setAttribute(
                                                'x2',
                                                bounce.left + bounce.width / 2
                                            );
                                            this.connection[rowTwo[i].rowOneIndex].setAttribute(
                                                'y2',
                                                bounce.top + bounce.height / 2
                                            );
                                        }
                                    }}
                                />
                            )}

                            <div className="content noselect">{rowTwo[i].text}</div>
                        </div>
                    </div>
                    <svg className="typeSix lineConnect">
                        <line x1="0" y1="0" x2="0" y2="0" className={color[i]} ref={e => (this.connection[i] = e)} />
                    </svg>
                </div>
            );
        }

        return output;
    }

    render() {
        const { onNext, q_title, data, ...other } = this.props;
        const { rowTwo } = this.state;

        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                showNextButton={rowTwo.filter(o => o.rowOneIndex != undefined).length == rowTwo.length}
                onNext={() => {
                    const { rowOne, rowTwo } = this.state;

                    let correct = false;

                    _.forEach(rowTwo, item => {
                        if (item.group == rowOne[item.rowOneIndex].group) {
                            correct = true;
                        } else {
                            correct = false;
                            return false;
                        }
                    });

                    if (onNext)
                        onNext({
                            correct,
                            answer: rowTwo.map(o => o.group),
                            fraction: correct ? 1 : 0
                        });
                }}
            >
                <div className="typeFive mt-5 container">{this._renderRow()}</div>
            </HomeworkLayout>
        );
    }
}

export default Connection;

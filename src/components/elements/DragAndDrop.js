import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';
import HomeworkLayout from './HomeworkLayout';

class DragAndDrop extends React.Component {
    state = {
        data: [],
        currentItem: null,
        answers: [],
        totalGroups: 0,
        correct: false,
        rawAnswers: [],
        hover: false
    };

    UNSAFE_componentWillMount() {
        let totalGroup = 0;

        this.props.q_text.split(' ').forEach(text => {
            if (text.match(/\[{2}.+?\]{2}/)) {
                totalGroup++;
            }
        });

        this.setState({
            answers: this.props.data || [],
            rawAnswers: this.props.data || [],
            totalGroups: totalGroup || 0
        });
    }

    onDragStart(item) {
        this.setState({
            currentItem: item
        });
    }

    onDragStop(item) {
        const { data, answers, hover, currentItem } = this.state;

        if (!hover) {
            // tìm index của item hiện tại trong dropzone
            const dataIndex = _.findIndex(data, o => {
                if (o && o.group && currentItem && currentItem.group && currentItem.group == o.group) return true;

                return false;
            });

            if (dataIndex > -1) {
                const answersIndex = answers.findIndex(o => {
                    return o && item.group && o.group == item.group;
                });

                answers[answersIndex].show = true;
                delete data[dataIndex];
            }
        }

        this.setState({
            currentItem: null,
            answers,
            data
        });
    }

    onDrop(group) {
        const { data, answers, currentItem } = this.state;

        if (!currentItem) {
            return;
        }

        // tìm index của item hiện tại trong dropzone
        const dataIndex = data.findIndex(o => {
            if (o && o.text && currentItem && currentItem.text && o.text == currentItem.text) return true;

            return false;
        });

        // tìm index của item hiện tại trong dragzone
        const answersIndex = answers.findIndex(o => {
            if (o && o.text && currentItem && currentItem.text && o.text == currentItem.text) return true;

            return false;
        });

        // trong trường hợp data trống
        if (dataIndex == -1) {
            if (
                data[group - 1] &&
                currentItem &&
                currentItem.text &&
                data[group - 1].text &&
                data[group - 1].text != currentItem.text
            ) {
                // trong trường hợp group đã có item khác
                // sẽ move item về dragzone
                // answers[group - 1] = data[group - 1];

                const currentAnswerIndex = answers.findIndex(o => {
                    if (o && o.text && data[group - 1] && data[group - 1].text && o.text == data[group - 1].text)
                        return true;

                    return false;
                });

                if (currentAnswerIndex > -1) {
                    answers[currentAnswerIndex].show = true;
                }
            }
            data[group - 1] = currentItem;
        } else {
            if (data[group - 1] && data[group - 1].text != currentItem.text) {
                // trong trường hợp group đã có item khác
                // sẽ move item về dragzone
                const currentAnswerIndex = answers.findIndex(o => {
                    if (o && o.text && data[group - 1] && data[group - 1].text && o.text == data[group - 1].text) {
                        return true;
                    }

                    return false;
                });

                if (currentAnswerIndex > -1) {
                    answers[currentAnswerIndex].show = true;
                }
            }

            delete data[dataIndex];
            data[group - 1] = currentItem;
        }

        // sau khi drag item vào dropzone thì xóa thông tin của item cũ
        if (answersIndex > -1) {
            answers[answersIndex].show = false;
        }

        // check xem item đó đã kéo thả vào vị trí đúng chưa = ))
        const correct = group && currentItem && currentItem.group && group == currentItem.group ? true : false;

        this.setState({
            data,
            answers,
            currentItem: null,
            correct
        });
    }

    _renderText() {
        const { q_text } = this.props;

        return (
            q_text
                .replace(/<.+?>/g, '')
                .replace(/\{br\}/g, ' {br} ')
                // .replace(/\n/g, ' {br} ')
                .split(/(\n|\s|\.|,|\?|:)/)
                .map((word, index) => {
                    if (word.match(/\[{2}.+?\]{2}/g)) {
                        const group = word.replace(/\[{2}(.+?)\]{2}/g, '$1');

                        return (
                            <Droppable
                                key={index}
                                className="textWrap dropped"
                                tag="span"
                                style={{ width: 'auto', minWidth: 100 }}
                                onDrop={() => {
                                    this.onDrop(group);
                                }}
                                onHover={() => {
                                    this.setState({
                                        hover: true
                                    });
                                }}
                                onUnHover={() => {
                                    this.setState({
                                        hover: false
                                    });
                                }}
                            >
                                {this.state.data[group - 1] && (
                                    <Draggable
                                        className="textAnswer"
                                        tag="span"
                                        key={index}
                                        style={{
                                            width: 'auto',
                                            minWidth: 100
                                        }}
                                        onDragStart={() => {
                                            this.onDragStart(this.state.data[group - 1]);
                                        }}
                                        onDragStop={() => {
                                            this.onDragStop(this.state.data[group - 1]);
                                        }}
                                    >
                                        {this.state.data[group - 1].text}
                                    </Draggable>
                                )}
                            </Droppable>
                        );
                    } else if (word == '{br}') {
                        return <br />;
                    } else {
                        return (
                            <span key={index} className="noselect">
                                {' '}
                                {word}{' '}
                            </span>
                        );
                    }
                })
        );
    }

    _renderOther() {
        const left = 8 - this.state.answers.length;

        const output = [];

        if (left > 0) {
            const classes = ['mt-4', 'text-center', `col-${Math.ceil(12 / this.state.answers.length)}`];
            for (let index = 0; index < left; index++) {
                output.push(
                    <div className={classes.join(' ')} key={index}>
                        <div
                            className="textAnswer"
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                minWidth: 100
                            }}
                        />
                    </div>
                );
            }
        }

        return output;
    }

    render() {
        const { answers } = this.state;
        const { onNext, q_title, ...other } = this.props;

        answers.sort((a, b) => {
            return a.pos < b.pos;
        });

        let totalData = 0;

        this.state.data.forEach(item => {
            totalData++;
        });

        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                onNext={() => {
                    const { data, correct } = this.state;

                    if (onNext)
                        onNext({
                            answer: data.map(item => item.pos),
                            correct,
                            fraction: correct ? 1 : 0
                        });
                }}
                showNextButton={totalData >= this.state.totalGroups}
            >
                <div className="typeSeven container">
                    <div className="contentWrap">
                        {/* <div className="title">{q_title}</div> */}
                        <div className="content">{this._renderText()}</div>
                    </div>

                    <div className="mt-4 row">
                        {answers.map((item, index) => {
                            const classes = ['mt-4', 'text-center', `col-${Math.ceil(12 / answers.length)}`];

                            if (item.show == false) {
                                return (
                                    <div className={classes.join(' ')} key={index}>
                                        <div
                                            className="textAnswer"
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderColor: 'transparent',
                                                minWidth: 100
                                            }}
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div className={classes.join(' ')} key={index}>
                                    <Draggable
                                        tag="span"
                                        className="textAnswer"
                                        style={{
                                            minWidth: 100
                                        }}
                                        onDragStart={() => {
                                            this.onDragStart(item);
                                        }}
                                        onDragStop={() => {
                                            this.onDragStop(item);
                                        }}
                                    >
                                        {item.text}
                                    </Draggable>
                                </div>
                            );
                        })}

                        {this._renderOther()}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

DragAndDrop.propTypes = {
    q_text: PropTypes.string,
    data: PropTypes.array,
    onNext: PropTypes.func
};

export default DragAndDrop;

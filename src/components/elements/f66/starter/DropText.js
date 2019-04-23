import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import _ from 'lodash';
import Droppable from 'src/components/Droppable/index';
import Draggable from 'src/components/Draggable/index';

class StarterSeven extends React.Component {
    state = {
        dataAnswers: [],
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

        const data = this.randomAnswer();

        this.setState({
            answers: data || [],
            rawAnswers: this.props.data || [],
            totalGroups: totalGroup || 0
        });
    }

    randomAnswer = () => {
        let correctAnswer = '';
        this.props.data.map(o => {
            correctAnswer += o.text;
        });
        const data = this.props.data
            .map(o => {
                if (o.group == 8 && o.pos == 2) {
                    o.group = 9;
                }

                return o;
            })
            .sort(() => Math.random() - 0.5);

        let suggestAnswer = '';
        data.map(o => {
            suggestAnswer += o.text;
        });
        if (suggestAnswer === correctAnswer) {
            return this.randomAnswer();
        }
        return data;
    };

    onDragStart(item) {
        this.setState({
            currentItem: item
        });
    }

    onDragStop(item) {
        const { dataAnswers, answers, hover, currentItem } = this.state;

        if (!hover) {
            // tìm index của item hiện tại trong dropzone
            const dataIndex = _.findIndex(dataAnswers, o => {
                if (o && o.group && currentItem && currentItem.group && currentItem.group == o.group) return true;

                return false;
            });

            if (dataIndex > -1) {
                const answersIndex = answers.findIndex(o => {
                    return o && item.group && o.group == item.group;
                });

                answers[answersIndex].show = true;
                delete dataAnswers[dataIndex];
            }
        }

        this.setState({
            currentItem: null,
            answers,
            dataAnswers
        });
    }

    onDrop(group) {
        let { dataAnswers, answers, currentItem } = this.state;

        if (!currentItem) {
            return;
        }

        // tìm index của item hiện tại trong dropzone
        const dataIndex = dataAnswers.findIndex(o => {
            if (o && o.group && currentItem && currentItem.group && o.group == currentItem.group) return true;

            return false;
        });

        // tìm index của item hiện tại trong dragzone
        const answersIndex = answers.findIndex(o => {
            if (o && o.group && currentItem && currentItem.group && o.group == currentItem.group) return true;

            return false;
        });

        // trong trường hợp data trống
        if (dataIndex == -1) {
            if (
                dataAnswers[group - 1] &&
                currentItem &&
                currentItem.group &&
                dataAnswers[group - 1].group &&
                dataAnswers[group - 1].group != currentItem.group
            ) {
                // trong trường hợp group đã có item khác
                // sẽ move item về dragzone
                // answers[group - 1] = data[group - 1];

                const currentAnswerIndex = answers.findIndex(o => {
                    if (
                        o &&
                        o.group &&
                        dataAnswers[group - 1] &&
                        dataAnswers[group - 1].group &&
                        o.group == dataAnswers[group - 1].group
                    )
                        return true;

                    return false;
                });

                if (currentAnswerIndex > -1) {
                    answers[currentAnswerIndex].show = true;
                }
            }
            dataAnswers[group - 1] = currentItem;
        } else {
            if (dataAnswers[group - 1] && dataAnswers[group - 1].group != currentItem.group) {
                // trong trường hợp group đã có item khác
                // sẽ move item về dragzone
                const currentAnswerIndex = answers.findIndex(o => {
                    if (
                        o &&
                        o.group &&
                        dataAnswers[group - 1] &&
                        dataAnswers[group - 1].group &&
                        o.group == dataAnswers[group - 1].group
                    ) {
                        return true;
                    }

                    return false;
                });

                if (currentAnswerIndex > -1) {
                    answers[currentAnswerIndex].show = true;
                }
            }

            delete dataAnswers[dataIndex];
            dataAnswers[group - 1] = currentItem;
        }

        // sau khi drag item vào dropzone thì xóa thông tin của item cũ
        if (answersIndex > -1) {
            answers[answersIndex].show = false;
        }

        // check xem item đó đã kéo thả vào vị trí đúng chưa = ))
        const correct = group && currentItem && currentItem.group && group == currentItem.group ? true : false;

        // dataAnswers = dataAnswers.filter(o => o);

        this.setState({
            dataAnswers,
            answers,
            currentItem: null,
            correct
        });
    }

    _sort(data) {
        const { answers } = this.state;

        const rawAnswer = _.clone(answers);

        let newData = data.sort((a, b) => a.group - b.group);

        if (newData.map(o => o.text).join('') == rawAnswer.map(o => o.text).join('')) {
            newData = this._sort(data);
        }

        return newData;
    }

    render() {
        const { onNext, q_title, q_picture, ...other } = this.props;

        const { answers } = this.state;

        let newData = _.clone(answers);

        newData = this._sort(newData);

        return (
            <DefaultLayout
                {...other}
                title={'Look at the pictures. Look at the letters. Write the words'}
                onNext={() => {
                    const { dataAnswers, rawAnswers } = this.state;

                    const trueAnswer = _.clone(rawAnswers)
                        .map(o => o.text)
                        .join('');
                    const dataAns = _.clone(dataAnswers)
                        .map(o => {
                            if (o && o.text) {
                                return o.text;
                            }

                            return '';
                        })
                        .join('');

                    const correct = trueAnswer === dataAns;

                    if (onNext)
                        onNext({
                            answer: dataAnswers.map(item => item.group),
                            correct,
                            fraction: correct ? 1 : 0
                        });
                }}
            >
                <div className="typeSeventeen w-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className={`col-${7 + answers.length - 4}`}>
                                <div className="mr-5">
                                    <div className="text-center mb-5 mt-5">
                                        <img src={q_picture} alt="" style={{ width: 300 }} />
                                    </div>
                                    <div className="row justify-content-center mb-5 text-center">
                                        <div className={`col-${7 + answers.length - 4}`}>
                                            <div className="row justify-content-center">
                                                {newData.map((item, index) => {
                                                    return (
                                                        <div
                                                            className={`col-${Math.floor(12 / answers.length)} ${
                                                                item.group
                                                            }`}
                                                            key={index}
                                                        >
                                                            <Droppable
                                                                tag="span"
                                                                className="textWrap noselect"
                                                                onDrop={() => {
                                                                    this.onDrop(item.group);
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
                                                                {this.state.dataAnswers[item.group - 1] && (
                                                                    <Draggable
                                                                        className={`textAnswer ${item.group -
                                                                            1} noselect`}
                                                                        tag="span"
                                                                        key={index}
                                                                        onDragStart={() => {
                                                                            this.onDragStart(
                                                                                this.state.dataAnswers[item.group - 1]
                                                                            );
                                                                        }}
                                                                        onDragStop={() => {
                                                                            this.onDragStop(
                                                                                this.state.dataAnswers[item.group - 1]
                                                                            );
                                                                        }}
                                                                    >
                                                                        {this.state.dataAnswers[item.group - 1].text}
                                                                    </Draggable>
                                                                )}
                                                            </Droppable>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mb-5 text-center">
                                        <div className={`col-${7 + answers.length - 4}`}>
                                            <div className="row justify-content-center">
                                                {answers.map((item, index) => {
                                                    const classes = [
                                                        'mt-4',
                                                        'text-center',
                                                        `col-${Math.floor(12 / answers.length)}`
                                                    ];
                                                    if (item.show == false) {
                                                        return (
                                                            <div className={classes.join(' ')} key={index}>
                                                                <div
                                                                    className="textAnswer"
                                                                    style={{
                                                                        backgroundColor: 'transparent',
                                                                        borderColor: 'transparent'
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div
                                                            className={`col-${Math.floor(12 / answers.length)}`}
                                                            key={index}
                                                        >
                                                            <Draggable
                                                                tag="span"
                                                                className="textAnswer noselect"
                                                                key={index}
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

StarterSeven.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array
};

export default StarterSeven;

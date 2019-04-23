import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HomeworkLayout from '../HomeworkLayout';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';

class DnDTextToVoice extends React.Component {
    state = {
        currentItem: null,
        audios: [],
        answers: [],
        data: []
    };

    constructor(props) {
        super(props);

        this.audio = new Audio();
    }

    UNSAFE_componentWillMount() {
        let { attachments, data } = this.props;

        if (attachments.sound && attachments.sound.length > 0) {
            this.setState({
                audios: attachments.sound.slice(1),
                answers: data.map(item => {
                    return { ...item, show: true };
                })
            });
        }
    }

    componentWillUnmount() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    onDragStart(item) {
        this.setState({
            currentItem: item
        });
    }

    onDragEnd() {
        this.setState({
            currentItem: null
        });
    }

    onDrop(group) {
        const { data, currentItem, answers } = this.state;

        const index = _.findIndex(answers, o => {
            if (o && currentItem && o.text == currentItem.text) return true;

            return false;
        });

        if (index > -1 && answers[index]) {
            answers[index].show = false;
        }

        const dataIndex = _.findIndex(data, o => {
            if (o && currentItem && o.text == currentItem.text) return true;

            return false;
        });

        if (dataIndex > -1) {
            if (data[dataIndex]) data[dataIndex] = data[group];
            else delete data[dataIndex];
        } else if (data[group]) {
            const dragIndex = _.findIndex(answers, o => {
                if (o && data[group] && o.text && data[group].text && o.text == data[group].text) return true;

                return false;
            });

            if (dragIndex > -1) {
                answers[dragIndex].show = true;
            }
        }

        data[group] = currentItem;

        this.setState({
            data,
            answers,
            currentItem: null
        });
    }

    render() {
        const { onNext, data, q_picture, q_title, ...other } = this.props;

        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                onNext={() => {
                    const { data } = this.state;

                    const correct = data.map(o => o.group).join(',') == '1,2,3';

                    if (onNext) {
                        onNext({
                            answer: data.map(item => item.group),
                            correct,
                            fraction: correct ? 1 : 0
                        });
                    }
                }}
                showNextButton={this.state.data.length == this.state.answers.length}
            >
                <div className="typeEleven container">
                    <div className="d-flex justify-content-around pb-5">
                        <div className="row">
                            {this.state.audios.map((item, index) => {
                                return (
                                    <div key={index} className="col-6 text-center pt-5">
                                        <button
                                            className="btn-3d btn-orange btn-rounded"
                                            onClick={() => {
                                                if (this.audio) {
                                                    this.audio.pause();
                                                }

                                                this.audio = new Audio(item);
                                                this.audio.play();
                                            }}
                                        >
                                            <div className="inner d-flex justify-content-between">
                                                <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                                    <path
                                                        fill="currentColor"
                                                        d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                                    />
                                                </svg>
                                                <Droppable
                                                    tag="div"
                                                    className="active-wrap"
                                                    onDrop={() => {
                                                        this.onDrop(index);
                                                    }}
                                                >
                                                    {this.state.data[index] && (
                                                        <Draggable
                                                            tag="span"
                                                            className="textAnswer"
                                                            style={{
                                                                margin: 0
                                                            }}
                                                            onDragStart={() => {
                                                                this.onDragStart(this.state.data[index]);
                                                            }}
                                                            onDragEnd={this.onDragEnd.bind(this)}
                                                        >
                                                            {this.state.data[index].text}
                                                        </Draggable>
                                                    )}
                                                </Droppable>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="text-center">
                            {this.state.answers.map((item, index) => {
                                if (item.show) {
                                    return (
                                        <Draggable
                                            tag="span"
                                            key={index}
                                            className="textAnswer"
                                            onDragStart={() => {
                                                this.onDragStart(item);
                                            }}
                                            onDragEnd={this.onDragEnd.bind(this)}
                                        >
                                            {item.text}
                                        </Draggable>
                                    );
                                }

                                return (
                                    <span
                                        className="textAnswer"
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'transparent',
                                            borderColor: 'transparent'
                                        }}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

export default DnDTextToVoice;

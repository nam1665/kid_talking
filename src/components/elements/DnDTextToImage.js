import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import HomeworkLayout from './HomeworkLayout';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';

class DnDTextToImage extends React.Component {
    state = {
        images: [],
        answers: [],
        data: [],
        currentItem: null
    };

    UNSAFE_componentWillMount() {
        const { data, q_pictures } = this.props;

        this.setState({
            images: q_pictures,
            answers: data.map(item => {
                item.show = true;

                return item;
            })
        });
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
        const { onNext, q_title, q_pictures, data, ...other } = this.props;

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
                <div className="typeEight container">
                    <div className="row imagesWrap">
                        {this.state.images.map((item, index) => {
                            if (index > 2) return null;
                            return (
                                <div className={`col-4`} key={index}>
                                    <div className="imgWrap">
                                        <img className="img-fluid" src={item} alt="" />
                                        <Droppable
                                            onDrop={() => {
                                                this.onDrop(index);
                                            }}
                                            tag="div"
                                            className="dropWrap"
                                        >
                                            {this.state.data[index] && (
                                                <Draggable
                                                    tag="div"
                                                    className="draggable"
                                                    onDragStart={() => {
                                                        this.onDragStart(this.state.data[index]);
                                                    }}
                                                    onDragEnd={this.onDragEnd.bind(this)}
                                                >
                                                    {this.state.data[index].text}
                                                </Draggable>
                                            )}
                                        </Droppable>
                                        {/* <div className="dropWrap" /> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Row */}

                    <div className="row justify-content-center">
                        {this.state.answers.map((item, index) => {
                            if (item.show) {
                                return (
                                    <Draggable
                                        onDragStart={() => {
                                            this.onDragStart(item);
                                        }}
                                        onDragEnd={this.onDragEnd.bind(this)}
                                        tag="div"
                                        className="draggable cgrab px-3 mb-3"
                                        key={index}
                                    >
                                        {item.text}
                                    </Draggable>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className="draggable"
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: 'transparent'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

DnDTextToImage.propTypes = {
    q_text: PropTypes.string,
    onNext: PropTypes.func,
    data: PropTypes.any,
    q_picture: PropTypes.string,
    q_title: PropTypes.string,
    q_pictures: PropTypes.any
};

export default DnDTextToImage;

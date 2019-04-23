import React from 'react';
import _ from 'lodash';
import HomeworkLayout from '../HomeworkLayout';

class FillColor extends React.Component {
    state = {
        currentColor: null,
        shapes: [],
        pens: []
    };

    UNSAFE_componentWillMount() {
        const { q_text, data, q_pictures } = this.props;

        const text = q_text.replace(/<.+?>/g, '');

        const groupMatches = text.match(/\[{2}.+?\:\]{2}/g);

        const pens = groupMatches.map((word, index) => {
            const value = word.replace(/\[{2}(.+?)\:\]{2}/, '$1');

            return {
                image: q_pictures[index],
                value
            };
        });

        const shapes = data.map(shape => {
            let correct = shape.url.match(/.*_(.+?)\.png/);
            if (correct) {
                correct = correct[1];
            } else {
                correct = '';
            }

            const url = shape.url.replace(/(.*_).+?(\.png)/, '$1line$2');

            return { url, correct };
        });

        // const penMargins = pens.map(() => new Animated.Value(PEN_HEIGHT * 0.9));
        this.setState({ pens, shapes });
    }

    render() {
        const { onNext, data, q_picture, q_title, ...other } = this.props;

        return (
            <HomeworkLayout
                {...other}
                title={q_title.replace('[[FC]]', '')}
                onNext={() => {
                    const { shapes } = this.state;
                    const correct = shapes.filter(shape => shape.correct !== shape.answer).length === 0;
                    onNext({
                        answer: shapes.map(shape => shape.answer).join(','),
                        correct: correct,
                        fraction: correct ? Number(this.props.data.q_mark || 1) : 0
                    });
                }}
                showNextButton={this.state.shapes.filter(shape => shape.answer).length == this.state.shapes.length}
            >
                <div className="typeTwelve container">
                    <div className="paper mx-auto" style={{ width: '62%' }}>
                        <div className="element-wrapper">
                            {this.state.shapes.map((item, index) => {
                                return (
                                    <div className="element" key={index}>
                                        <img
                                            src={item.url}
                                            className="w-100 h-auto"
                                            draggable={false}
                                            onClick={e => {
                                                if (this.state.currentColor) {
                                                    const { shapes } = this.state;

                                                    shapes[index].url = e.target.src.replace(
                                                        /(.*_).+?(\.png)/,
                                                        '$1' + this.state.currentColor.value + '$2'
                                                    );
                                                    shapes[index].answer = this.state.currentColor.value;

                                                    this.setState({
                                                        shapes
                                                    });
                                                }
                                            }}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <img src="/images/homework/paper.png" className="w-100 h-auto" alt="" />
                    </div>
                    <div className="pencil-box">
                        {this.state.pens.map((item, index) => {
                            let margin = -200;

                            // if (index == 1) {
                            //     margin = -120;
                            // } else if (index == 2) {
                            //     margin = -35;
                            // } else if (index == 3) {
                            //     margin = 45;
                            // } else if (index == 4) {
                            //     margin = 130;
                            // }

                            return (
                                <div
                                    className="pencil"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                    onClick={e => {
                                        const items = document.querySelectorAll('.pencil');

                                        items.forEach(item => {
                                            item.classList.remove('active');
                                        });

                                        if (this.state.currentColor && this.state.currentColor.value == item.value) {
                                            this.setState({
                                                currentColor: null
                                            });
                                        } else {
                                            e.target.classList.add('active');

                                            this.setState({
                                                currentColor: item
                                            });
                                        }
                                    }}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

export default FillColor;

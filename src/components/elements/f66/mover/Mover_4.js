import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import { Fade } from 'reactstrap';

class Mover_4 extends React.Component {
    state = {
        checked: false,
        listAnswer: ['1', '2', '3', '4', '5', '6'],
        listQuestion: [
            {
                label: 'What does Jane want to put on?',
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/5.png' },
                    { a: 2, src: '/images/homework/test-4/6.png' },
                    { a: 3, src: '/images/homework/test-4/7.png' }
                ],
                answer: null
            },
            {
                label: "Where's Jim now?",
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/8.png' },
                    { a: 2, src: '/images/homework/test-4/9.png' },
                    { a: 3, src: '/images/homework/test-4/10.png' }
                ],
                answer: null
            },
            {
                label: "What's Peter's favorite sport?",
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/11.png' },
                    { a: 2, src: '/images/homework/test-4/12.png' },
                    { a: 3, src: '/images/homework/test-4/13.png' }
                ],
                answer: null
            },
            {
                label: 'What does Jane want to put on?',
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/14.png' },
                    { a: 2, src: '/images/homework/test-4/15.png' },
                    { a: 3, src: '/images/homework/test-4/16.png' }
                ],
                answer: null
            },
            {
                label: 'What does Jane want to put on?',
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/17.png' },
                    { a: 2, src: '/images/homework/test-4/18.png' },
                    { a: 3, src: '/images/homework/test-4/19.png' }
                ],
                answer: null
            },
            {
                label: 'What does Jane want to put on?',
                listAnswer: [
                    { a: 1, src: '/images/homework/test-4/20.png' },
                    { a: 2, src: '/images/homework/test-4/21.png' },
                    { a: 3, src: '/images/homework/test-4/22.png' }
                ],
                answer: null
            }
        ]
    };

    _answer() {
        const { listQuestion } = this.state;
        if (
            listQuestion[0].answer != null &&
            listQuestion[1].answer != null &&
            listQuestion[2].answer != null &&
            listQuestion[3].answer != null &&
            listQuestion[4].answer != null &&
            listQuestion[5].answer != null
        ) {
            this.setState({
                checked: true
            });
        }
    }

    render() {
        const { onNext, data, q_text, q_title, ...other } = this.props;
        const { listQuestion } = this.state;
        return (
            <DefaultLayout
                {...other}
                title={'Listen and tick the box'}
                // onNext={() => {
                //     const { checked } = this.state;
                //     if (onNext && checked)
                //         onNext({
                //             answer: [checked.pos],
                //             correct: Number(checked.fraction) === 1,
                //             fraction: Number(checked.fraction)
                //         });
                // }}
                showNextButton={this.state.checked}
            >
                <div className="typeEighteen w-100">
                    <div className="container">
                        <div className="row">
                            {listQuestion.map((item1, index) => (
                                <div key={index.toString()} className="col-md-6">
                                    <div className="question-wrapper">
                                        <h2>{item1.label}</h2>
                                        <div className="row">
                                            {item1.listAnswer.map((item, index) => (
                                                <div
                                                    key={index.toString()}
                                                    onClick={() => {
                                                        item1.answer = item.a;
                                                        this.setState({ listQuestion }, () => this._answer());
                                                    }}
                                                    className="col-md-4"
                                                >
                                                    <div
                                                        className={`img-wrap  ${
                                                            item1.answer == item.a ? 'checked' : null
                                                        }`}
                                                    >
                                                        <img src={item.src} className="w-100 h-auto" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

Mover_4.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default Mover_4;

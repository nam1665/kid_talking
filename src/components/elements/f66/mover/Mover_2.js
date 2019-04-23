import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import { Fade } from 'reactstrap';

class Mover_2 extends React.Component {
    state = {
        checked: false,
        listAnswer: ['1', '2', '3', '4', '5'],
        listQuestion: [],
        a1: null,
        a2: null,
        a3: null,
        a4: null,
        a5: null
    };

    _answer() {
        const { a1, a2, a3, a4, a5 } = this.state;
        if (a1 != null && a2 != null && a3 != null && a4 != null && a5 != null) {
            return this.setState({
                checked: true
            });
        }
        this.setState({
            checked: false
        });
    }
    _renderQuestion() {
        const question = this.props.q_text.split(/\[{2}(.+?)]{2}/);
        const answer = this.state.checked ? this.state.checked.text : '';
        return (
            <div className="title text-center">
                {question[0]} <strong className="textWrap">{answer}</strong> {question[2]}
            </div>
        );
    }
    render() {
        const { onNext, data, q_text, q_title, ...other } = this.props;
        return (
            <DefaultLayout
                {...other}
                title={'Listen and draw line'}
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
                <div className="typeSixteen w-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <div className="text-center">
                                    <img
                                        src="/images/homework/test-2/4.png"
                                        style={{ maxWidth: '80%', height: 'auto' }}
                                    />
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    <span>1. Name of farm:</span>
                                    <div className="answer">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a1: answer ? e.target.value : null
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    2. Number of fields:
                                    <div className="answer">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a2: answer ? e.target.value : null
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    3. Kind of vagetables that farmer plant:
                                    <div className="answer">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a3: answer ? e.target.value : null
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    4. Kind of fruit trees
                                    <div className="answer">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a4: answer ? e.target.value : null
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    5. Can go to the farm
                                    <div className="answer">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a5: answer ? e.target.value : null
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
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

Mover_2.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default Mover_2;

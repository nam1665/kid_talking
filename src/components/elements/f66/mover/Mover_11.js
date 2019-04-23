import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';

class Mover_11 extends React.Component {
    state = {
        checked: false,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: ''
    };

    onsubmit() {
        const { value1, value2, value3, value4, value5, value6 } = this.state;

        if (value1 != '' && value2 != '' && value3 != '' && value4 != '' && value5 != '' && value6 != '') {
            return this.setState({
                checked: true
            });
        }
        this.setState({
            checked: false
        });
    }

    render() {
        const { onNext, data, q_title, ...other } = this.props;
        data.sort((a, b) => {
            return a.pos < b.pos;
        });

        return (
            <DefaultLayout
                {...other}
                title={q_title}
                onNext={() => {
                    const { checked } = this.state;
                    if (onNext && checked)
                        onNext({
                            answer: [checked.pos],
                            correct: Number(checked.fraction) === 1,
                            fraction: Number(checked.fraction)
                        });
                }}
                showNextButton={this.state.checked}
            >
                <div className="typeTwentyFive w-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <img
                                    src="/images/homework/test-11/1.png"
                                    className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="answer-wrapper mb-3">
                                    <p>
                                        <strong>Complete the sentences</strong>
                                    </p>
                                    <p>
                                        1. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input
                                                value={this.state.value1}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value1: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                        adipiscing elit.
                                    </p>
                                    <p>
                                        2. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input
                                                value={this.state.value2}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value2: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                        adipiscing elit.
                                    </p>
                                </div>
                                <div className="answer-wrapper mb-3">
                                    <p>
                                        <strong>Answer the questions</strong>
                                    </p>
                                    <p>
                                        3. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input
                                                value={this.state.value3}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value3: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                        adipiscing elit.
                                    </p>
                                    <p>
                                        4. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input
                                                value={this.state.value4}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value4: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                        adipiscing elit.
                                    </p>
                                </div>
                                <div className="answer-wrapper">
                                    <p>
                                        <strong>Now write two sentences about the picture</strong>
                                    </p>
                                    <p>
                                        <span className="answer sentence">
                                            <input
                                                value={this.state.value5}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value5: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                    </p>
                                    <p>
                                        <span className="answer sentence">
                                            <input
                                                value={this.state.value6}
                                                type="text"
                                                placeholder=" "
                                                onChange={e =>
                                                    this.setState(
                                                        {
                                                            value6: e.target.value != '' ? e.target.value : ''
                                                        },
                                                        () => this.onsubmit()
                                                    )
                                                }
                                            />
                                        </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

Mover_11.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array
};

export default Mover_11;

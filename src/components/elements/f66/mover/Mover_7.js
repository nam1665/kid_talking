import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import { Fade } from 'reactstrap';
import index from 'src/modules/account/pages/index/index';

class Mover_7 extends React.Component {
    state = {
        checked: false,
        listQuestion: [
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 1',
                        value: 1,
                        key: 1
                    },
                    {
                        label: 'Custom checkbox 2',
                        value: 2,
                        key: 2
                    },
                    {
                        label: 'Custom checkbox 3',
                        value: 3,
                        key: 3
                    }
                ],
                answer: null
            },
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 4',
                        value: 1,
                        key: 4
                    },
                    {
                        label: 'Custom checkbox 5',
                        value: 2,
                        key: 5
                    },
                    {
                        label: 'Custom checkbox 6',
                        value: 3,
                        key: 6
                    }
                ],
                answer: null
            },
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 4',
                        value: 1,
                        key: 7
                    },
                    {
                        label: 'Custom checkbox 5',
                        value: 2,
                        key: 8
                    },
                    {
                        label: 'Custom checkbox 6',
                        value: 3,
                        key: 9
                    }
                ],
                answer: null
            },
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 4',
                        value: 1,
                        key: 10
                    },
                    {
                        label: 'Custom checkbox 5',
                        value: 2,
                        key: 11
                    },
                    {
                        label: 'Custom checkbox 6',
                        value: 3,
                        key: 12
                    }
                ],
                answer: null
            },
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 4',
                        value: 1,
                        key: 13
                    },
                    {
                        label: 'Custom checkbox 5',
                        value: 2,
                        key: 14
                    },
                    {
                        label: 'Custom checkbox 6',
                        value: 3,
                        key: 15
                    }
                ],
                answer: null
            },
            {
                label: 'My grandpa bought me a car yesterday!',
                listAnswer: [
                    {
                        label: 'Custom checkbox 4',
                        value: 1,
                        key: 16
                    },
                    {
                        label: 'Custom checkbox 5',
                        value: 2,
                        key: 17
                    },
                    {
                        label: 'Custom checkbox 6',
                        value: 3,
                        key: 18
                    }
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
                title={'Read text and tick the best answer'}
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
                <div className="typeTwentyOne w-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <img src="/images/homework/test-7/1.png" className="w-100 h-auto" />
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    {listQuestion.map((item, index) => (
                                        <div key={index.toString()} className="col-md-6 mb-4">
                                            <div className="question">
                                                <div className="d-flex mb-2">
                                                    <div className="name">
                                                        <strong>Jim:</strong>
                                                    </div>
                                                    <div>{item.label}</div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="name">
                                                        <strong>Paw:</strong>
                                                    </div>
                                                    <div>
                                                        {item.listAnswer.map((item1, index1) => (
                                                            <div
                                                                key={index1.toString()}
                                                                className="custom-control custom-checkbox"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={item1.value == item.answer}
                                                                    onChange={e => {
                                                                        item.answer = item1.value;
                                                                        this.setState({ listQuestion }, () => {
                                                                            this._answer();
                                                                        });
                                                                    }}
                                                                    className="custom-control-input"
                                                                    id={item1.key}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor={item1.key}
                                                                >
                                                                    {item1.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

Mover_7.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default Mover_7;

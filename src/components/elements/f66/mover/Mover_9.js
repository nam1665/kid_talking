import React from 'react';
import DefaultLayout from '../../DefaultLayout';

const data = [
    [
        {
            label: 'that',
            value: 'that'
        },
        {
            label: 'this',
            value: 'this'
        },
        {
            label: 'there',
            value: 'there'
        }
    ],
    [
        {
            label: 'who',
            value: 'who'
        },
        {
            label: 'whom',
            value: 'whom'
        },
        {
            label: 'whose',
            value: 'whose'
        }
    ],
    [
        {
            label: 'what',
            value: 'what'
        },
        {
            label: 'where',
            value: 'where'
        },
        {
            label: 'why',
            value: 'why'
        }
    ],
    [
        {
            label: 'hihi',
            value: 'hihi'
        },
        {
            label: 'hehe',
            value: 'hehe'
        },
        {
            label: 'haha',
            value: 'haha'
        }
    ],
    [
        {
            label: 'that',
            value: 'that'
        },
        {
            label: 'that',
            value: 'that'
        },
        {
            label: 'that',
            value: 'that'
        }
    ]
];

export default class MoverNine extends React.Component {
    state = {
        questions: [
            {
                q: 'Cow live that [[]] test test test',
                answer: null
            },
            {
                q: 'Cow live that [[]] test test test',
                answer: null
            },
            {
                q: 'Cow live that [[]] test test test',
                answer: null
            },
            {
                q: 'Cow live that [[]] test test test',
                answer: null
            },
            {
                q: 'Cow live that [[]] test test test',
                answer: null
            }
        ]
    };

    renderQuestion(item) {
        return item.q.split(' ').map((word, key) => {
            if (word.indexOf('[[]]') > -1) {
                return <span>{item.answer ? item.answer : ''}</span>;
            }

            return ' ' + word + ' ';
        });
    }

    render() {
        return (
            <DefaultLayout>
                <div className="typeTwentyThree w-100">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <div className="results-wrapper">
                                    {this.state.questions.map((item, index) => {
                                        return (
                                            <div className="result m-3" key={index}>
                                                {index + 1}. {this.renderQuestion(item)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <img
                                    src="/images/homework/test-9/2.png"
                                    className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                                    alt=""
                                />
                                {data.map((val, key) => {
                                    return (
                                        <div className="d-flex mb-3 answer-wrapper" key={key}>
                                            <div className="mx-3">{key + 1}</div>
                                            {val.map((item, index) => {
                                                return (
                                                    <div
                                                        className="custom-control custom-radio mx-3"
                                                        key={`item-${key + 1}-${index}-${item.label}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id={`item-${key + 1}-${index}-${item.label}`}
                                                            defaultChecked={false}
                                                            name={`item-${key + 1}`}
                                                            value={item.value}
                                                            onChange={e => {
                                                                const { questions } = this.state;

                                                                questions[key].answer = e.target.value;

                                                                this.setState({
                                                                    questions
                                                                });
                                                            }}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor={`item-${key + 1}-${index}-${item.label}`}
                                                        >
                                                            {item.label}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

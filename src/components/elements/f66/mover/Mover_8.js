import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import { Fade } from 'reactstrap';
import index from 'src/modules/account/pages/index/index';

class Mover_8 extends React.Component {
    state = {
        checked: false,
        listAnswer: [
            {
                label: 'TextHere',
                src: '/images/homework/test-8/6.png'
            },
            {
                label: 'TextHere 1',
                src: '/images/homework/test-8/7.png'
            },
            {
                label: 'TextHere 2',
                src: '/images/homework/test-8/8.png'
            },
            {
                label: 'TextHere 3',
                src: '/images/homework/test-8/9.png'
            },
            {
                label: 'TextHere 4',
                src: '/images/homework/test-8/10.png'
            },
            {
                label: 'TextHere 5',
                src: '/images/homework/test-8/11.png'
            },
            {
                label: 'TextHere 6',
                src: '/images/homework/test-8/12.png'
            },
            {
                label: 'TextHere 7',
                src: '/images/homework/test-8/13.png'
            },
            {
                label: 'TextHere 8',
                src: '/images/homework/test-8/14.png'
            }
        ],
        listNameOfStory: [{ label: 'Name 1', value: 1 }, { label: 'Name 2', value: 2 }, { label: 'Name 3', value: 3 }],
        nameStory: null,
        a1: null,
        a2: null,
        a3: null,
        a4: null,
        a5: null,
        a6: null
    };

    _answer() {
        const { a1, a2, a3, a4, a5, a6, nameStory } = this.state;
        if (a1 != null && a2 != null && a3 != null && a4 != null && a5 != null && a6 != null && nameStory !== null) {
            return this.setState({
                checked: true
            });
        }
        return this.setState({
            checked: false
        });
    }

    render() {
        const { onNext, data, q_text, q_title, ...other } = this.props;
        const { listAnswer, listNameOfStory } = this.state;
        return (
            <DefaultLayout
                {...other}
                title={'Read text and tick the best answer'}
                // q_audio = {}
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
                <div className="typeTwentyTwo">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    Vicky and her sister, Daisy, were in their,{' '}
                                    <span className="answer mb-2">
                                        <input type="text" placeholder=" " value="bedroom" />
                                    </span>
                                    {" '"}
                                    Will you play a game with me? I want to be a doctor,{"' "} asked Daisy was
                                    <span className="answer mb-2">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a1}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a1: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                    when Vicky said {" '"}Yes{"' "}. Most days, Vicky said {" '"}No{"' "}
                                    <span className="answer mb-3">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a2}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a2: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                    a sollicitudin felis{' '}
                                    <span className="answer mb-3">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a3}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a3: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                    orci luctus nunc. Sed at malesuada urna, sit amet sodales erat. Quisque ut{' '}
                                    <span className="answer mb-3">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a4}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a4: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                    feugiat diam.{' '}
                                    <span className="answer mb-3">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a5}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a5: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                    Will you play a game with me? I want to be a doctor{' '}
                                    <span className="answer mb-3">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a6}
                                            onChange={e => {
                                                const answer = e.target.value != '';
                                                this.setState(
                                                    {
                                                        a6: answer ? e.target.value : null
                                                    },
                                                    () => {
                                                        this._answer();
                                                    }
                                                );
                                            }}
                                        />
                                    </span>{' '}
                                </p>
                                <p>
                                    <strong>Now choose the name for the story</strong>
                                </p>

                                {this.state.listNameOfStory.map((item, index) => (
                                    <div key={index.toString()} className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            checked={this.state.nameStory == item.value}
                                            id={index}
                                            onChange={e => {
                                                this.setState(
                                                    {
                                                        nameStory: item.value
                                                    },
                                                    () => this._answer()
                                                );
                                            }}
                                        />
                                        <label className="custom-control-label" htmlFor={index}>
                                            {item.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <div className="row text-center text-dark font-weight-bold">
                                    {this.state.listAnswer.map((item, index) => (
                                        <div key={index.toString()} className="col-md-4 mb-3">
                                            <img src={item.src} className="w-100 h-auto" />
                                            {item.label}
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

Mover_8.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default Mover_8;

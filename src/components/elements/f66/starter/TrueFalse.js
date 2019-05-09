import React from 'react';
import _ from 'lodash';
import DefaultLayout from '../../DefaultLayout';

import BaseLayer from './Base.js'
// import uuid from "uuid";
// import Artyom from 'artyom.js';
// import ArtyomCommandsManager from 'src/helpers/ArtyomCommands';


class StarterFive extends BaseLayer {
    state = {
        data: {
            q: 'There are shoes',
            i: '/images/homework/test-13/6.png',
            a: '',
            t: 'x'
        },
        checked: null
    };

    nextQuestion(){
        this.setDefault();
        let res = {};

        if (this.props.isExample) {
            res = {
                answer: ['example'],
                correct: false,
                fraction: 0
            };
        } else {
            if (this.state.checked != null) {
                res = {
                    answer: [this.state.checked],
                    correct: Number(this.props.data[this.state.checked].fraction) == 1,
                    fraction: Number(this.props.data[this.state.checked].fraction)
                };
            } else {
                res = {
                    answer: [''],
                    correct: false,
                    fraction: 0
                };
            }
        }
        this.props.onNext(res)
    }

    componentDidMount() {
        console.log(1);
        if (this.props.isExample) {
            this.timeout = setTimeout(() => {
                if (this.falseBtn) {
                    this.falseBtn.classList.add('active');
                }
            }, 1000);
        }
        // this.textToSpeech(this.props.q_text);
        // console.log(this.props.q_text)
        this.status_wait = true;
        this.wait();

    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    renderQuestion() {
        if (this.props.isExample) {
            return (
                <div className="col-md-7 text-center">
                    <h2 className="text-white">{this.state.data.q}</h2>
                    <p className="mb-2">
                        <img src={this.state.data.i} alt="" style={{ width: 350 }} />
                    </p>
                    <button className={`btn btn-link btn-lg btn-true`} ref={e => (this.falseBtn = e)}>
                        True
                    </button>
                    <button className={`btn btn-link btn-lg btn-false`}>False</button>
                </div>
            );
        }

        return (
            <div className="col-md-7 text-center">
                <h2 className="text-white mb-3">{this.props.q_text}</h2>
                <p className="mb-2">
                    <img src={this.props.q_picture} alt="" style={{ width: 350 }} />
                </p>
                <button
                    className={`btn btn-link btn-lg btn-true ${this.state.checked == 0 ? 'active' : ''}`}
                    onClick={e => {
                        this.setState({
                            checked: 0
                        });
                        this.send(this.trigger_confirm);
                    }}
                >
                    True
                </button>
                <button
                    className={`btn btn-link btn-lg btn-false ${this.state.checked == 1 ? 'active' : ''}`}
                    onClick={() => {
                        this.setState({
                            checked: 1
                        });
                        this.send(this.trigger_confirm);                        
                    }}
                >
                    False
                </button>
            </div>
        );
    }

    render() {
        const { onNext, isExample, q_title, data, ...rest } = this.props;
        return (
            <DefaultLayout
                {...rest}
                title={`${isExample ? 'Example: ' : ''}${q_title
                    .replace(/\[\[.*?\]\]/g, '')
                    .replace('v: True', '<img width="60" height="60" src="/images/homework/test-13/true.png" />')
                    .replace('x: False', '<img width="60" height="60" src="/images/homework/test-13/false.png" />')
                    .trim()}`}
                onNext={() => {
                    this.nextQuestion();
                }}
            >
                <div className="typeTwentySeven w-100">
                    <div className="container">
                        <div className="row justify-content-center">{this.renderQuestion()}</div>
                        {this._javisrender()}
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

export default StarterFive;

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DefaultLayout from '../../DefaultLayout';
import BaseLayer from './Base.js'

class StarterThree extends BaseLayer {
    state = {
        checked: null,
        listExample: {
            q: 'What does Kim want?',
            images: [
                'images/homework/test-3/starter/18.png',
                'images/homework/test-3/starter/15.png',
                'images/homework/test-3/starter/13.png'
            ],
            a: 1
        }
    };

    renderQuestion() {
        console.log(5);
        this.status_wait = true;
        this.wait(60000);
        if (this.props.isExample) {
            return (
                <div className="col-md-8">
                    <div className="question-wrapper">
                        <h2>{this.state.listExample.q}</h2>
                        <div className="row">
                            {this.state.listExample.images.map((item, index) => {
                                return (
                                    <div key={index.toString()} className="col-md-4">
                                        <div
                                            className={`img-wrap  ${
                                                index == this.state.listExample.a ? 'checked' : null
                                            }`}
                                        >
                                            <img src={item} className="w-100 h-auto" alt="" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="col-md-8">
                <div className="question-wrapper">
                    <h2>{this.props.q_text.trim()}</h2>
                    <div className="row">
                        {this.props.attachments.picture.map((item, index) => {
                            return (
                                <div
                                    key={index.toString()}
                                    className="col-md-4"
                                    onClick={() => {
                                        this.setState({
                                            checked: index
                                        });
                                        // viet vao day
                                        this.send(this.trigger_confirm);
                                    }}
                                >
                                    <div className={`img-wrap  ${index === this.state.checked ? 'checked' : null}`}>
                                        <img src={item} className="w-100 h-auto" alt="" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    nextQuestion(){
        this.setDefault();
        let res = {};

        const ansData = _.clone(this.props.data).sort((a, b) => {
            return a.pos - b.pos;
        });
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
                    correct: Number(ansData[this.state.checked].fraction) == 1,
                    fraction: Number(ansData[this.state.checked].fraction)
                };
            } else {
                res = {
                    answer: [''],
                    correct: false,
                    fraction: 0
                };
            }
        }

        this.props.onNext(res);
    }
    render() {
        const { onNext, isExample, q_text, data, q_title, ...other } = this.props;

        return (
            <DefaultLayout
                {...other}
                title={`${isExample ? 'Example: ' : ''}${q_title.replace(/\[\[.*?\]\]/g, '').trim()}`}
                onNext={() => {
                    this.nextQuestion();
                }}
            >
                <div className="typeEighteen w-100">
                    <div className="container">
                        <div className="row justify-content-center">{this.renderQuestion()}</div>
                    </div>
                </div>
                {this._javisrender()} 
            </DefaultLayout>
        );
    }
}

StarterThree.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default StarterThree;

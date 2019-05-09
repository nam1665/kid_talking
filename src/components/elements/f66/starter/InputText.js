import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DefaultLayout from '../../DefaultLayout';
import BaseLayer from './Base.js'

class StarterTwo extends BaseLayer {
    state = {
        value: ''
    };
    status_t2s = false;
    componentDidMount() {
        if (this.inputText) {
            this.inputText.focus();
        }
        console.log(4);

        // this.textToSpeech(this.props.q_text);
        // console.log(this.props.q_text);
        this.status_wait = true;
        this.wait(60000);
    }

    renderQuestion() {
        if (this.props.isExample) {
            if (this.props.q_title.indexOf('ENTRANCE_TEST_STARTER_9') > -1) {
                return (
                    <React.Fragment>
                        <div className="question d-flex justify-content-between mt-3 align-items-center">
                            <span>1. What is the boy bouncing?</span>
                            <div className="answer">
                                <input type="text" placeholder=" " value="ball" disabled />
                            </div>
                        </div>
                        <div className="question d-flex justify-content-between mt-3 align-items-center">
                            <span>2. How many people are sitting at the table?</span>
                            <div className="answer">
                                <input type="text" placeholder=" " value="two" disabled />
                            </div>
                        </div>
                    </React.Fragment>
                );
            }

            if (this.props.q_title.indexOf('ENTRANCE_TEST_STARTER_6') > -1) {
                return (
                    <React.Fragment>
                        <div className="question d-flex justify-content-between mt-3 align-items-center">
                            <span>1. The boy and girl are waving</span>
                            <div className="answer">
                                <input type="text" placeholder=" " value="yes" disabled />
                            </div>
                        </div>
                        <div className="question d-flex justify-content-between mt-3 align-items-center">
                            <span>2. Some birds are sitting in the tree</span>
                            <div className="answer">
                                <input type="text" placeholder=" " value="no" disabled />
                            </div>
                        </div>
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment>
                    <div className="question d-flex justify-content-between mt-3 align-items-center">
                        <span>1. What is boy{"'"}s name?</span>
                        <div className="answer">
                            <input type="text" placeholder=" " value="Bill" disabled />
                        </div>
                    </div>
                    <div className="question d-flex justify-content-between mt-3 align-items-center">
                        <span>2. How many arms has the monster got?</span>
                        <div className="answer">
                            <input type="text" placeholder=" " value="6" disabled />
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        const text = this.props.q_text.split('?');

        let beforeText = this.props.q_text.match(/\?(.*?)\[\[/g);
        let afterText = this.props.q_text.match(/\]\](.*?)+/g);

        if (beforeText && beforeText[0]) {
            beforeText = beforeText[0]
                .replace('?', '')
                .replace(/\[\[/g, '')
                .trim();
        } else {
            beforeText = null;
        }

        if (beforeText && afterText[0]) {
            afterText = afterText[0].replace(/\]\]/g, '').trim();
        } else {
            afterText = null;
        }

        return (
            <div className="question d-flex justify-content-between mt-3 align-items-center">
                <span>
                    {text[0].replace(/\[\[[0-9]\]\]/g, '')}
                    {this.props.q_text.indexOf('?') > -1 ? '?' : null}
                </span>
                <div className="answer">
                    {beforeText ? beforeText : null}
                    <input
                        type="text"
                        placeholder=" "
                        value={this.state.value}
                        onChange={e => {
                            this.setState({
                                value: e.target.value
                            });
                            // viet vao day
                            this.status_t2s = true;
                            setTimeout(() => {
                                if (this.status_t2s){
                                    this.send(this.trigger_confirm);
                                }
                                this.status_t2s = false;                   
                            }, 500)
                        }}
                        ref={e => (this.inputText = e)}
                    />
                    {afterText ? afterText : null}
                </div>
            </div>
        );
    }

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
            const correct =
                _.findIndex(this.props.data, o => {
                    return o.text.toLowerCase() == this.state.value.toLowerCase();
                }) > -1;

            res = {
                answer: [this.state.value],
                correct: correct,
                fraction: correct ? 1 : 0
            };
        }

        this.props.onNext(res);
    }

    render() {
        const { onNext, isExample, q_title, attachments, data, ...other } = this.props;

        return (
            <DefaultLayout
                {...other}
                title={`${isExample ? 'Example: ' : ''}${q_title.replace(/\[\[.*?\]\]/g, '').trim()}`}
                onNext={() => {
                    this.nextQuestion();
                }}
            >
                <div className="typeSixteen w-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <div className="text-center">
                                {this._javisrender()} 
                                    <img
                                        src={
                                            attachments.picture && attachments.picture[0]
                                                ? attachments.picture[0]
                                                : '/images/homework/test-2/1.png'
                                        }
                                        style={{ maxWidth: '80%', height: 'auto' }}
                                        alt=""
                                    />
                                </div>
                                {this.renderQuestion()}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

StarterTwo.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default StarterTwo;

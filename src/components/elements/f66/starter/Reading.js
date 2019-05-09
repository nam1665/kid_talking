import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import BaseLayer from './Base.js'
class StarterEight extends BaseLayer {
    state = {
        checked: false,
        listAnswer: [
            {
                label: 'sea',
                src: '/images/homework/test-8/starter/2.png'
            },
            {
                label: 'pencil',
                src: '/images/homework/test-8/starter/3.png'
            },
            {
                label: 'fish',
                src: '/images/homework/test-8/starter/4.png'
            },
            {
                label: 'books',
                src: '/images/homework/test-8/starter/5.png'
            },
            {
                label: 'hippo',
                src: '/images/homework/test-8/starter/6.png'
            },
            {
                label: 'hats',
                src: '/images/homework/test-8/starter/7.png'
            },
            {
                label: 'football',
                src: '/images/homework/test-8/starter/8.png'
            },
            {
                label: 'sand',
                src: '/images/homework/test-8/starter/9.png'
            }
        ],
        nameStory: null,
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        a5: ''
    };

    nextQuestion(){
        this.setDefault();
        
        const { a1, a2, a3, a4, a5 } = this.state;

        let correct = true;
        let point = 5;

        const answers = [];

        if (a1 && a1.toLowerCase() == 'hats') {
            answers.push(`${a1.toLowerCase()}:true`);
        } else {
            correct = false;
            point = point - 1;
            answers.push(`${a1.toLowerCase()}:false`);
        }

        if (a2 && a2.toLowerCase() == 'books') {
            answers.push(`${a2.toLowerCase()}:true`);
        } else {
            correct = false;
            point = point - 1;
            answers.push(`${a2.toLowerCase()}:false`);
        }

        if (a3 && a3.toLowerCase() == 'sand') {
            answers.push(`${a3.toLowerCase()}:true`);
        } else {
            correct = false;
            point = point - 1;
            answers.push(`${a3.toLowerCase()}:false`);
        }

        if (a4 && a4.toLowerCase() == 'football') {
            answers.push(`${a4.toLowerCase()}:true`);
        } else {
            correct = false;
            point = point - 1;
            answers.push(`${a4.toLowerCase()}:false`);
        }

        if (a5 && a5.toLowerCase() == 'fish') {
            answers.push(`${a5.toLowerCase()}:true`);
        } else {
            correct = false;
            point = point - 1;
            answers.push(`${a5.toLowerCase()}:false`);
        }

        const data = {
            answer: answers,
            correct: correct,
            fraction: Number(point)
        };

        this.props.onNext(data);
    }

    componentDidMount() {
        console.log(2);
        if (this.inputText) {
            this.inputText.focus();
        }
        // this.textToSpeech(this.props.q_text);
        this.status_wait = true;
        this.wait(30000);
    }

    _answer() {
        const { a1, a2, a3, a4, a5 } = this.state;
        if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "") {
            this.status_t2s = true;
            setTimeout(() => {
                if (this.status_t2s){
                    this.send(this.trigger_confirm);
                }
                this.status_t2s = false;                   
            }, 500);
            return this.setState({
                checked: true
            });            
        }
        return this.setState({
            checked: false
        });
    }

    render() {
        const { onNext, ...other } = this.props;
        return (
            <DefaultLayout
                {...other}
                wrapperClasses="resize-it-please"
                title={'Read this. Choose a word from the box. Write the correct word next to numbers 1-5'}
                onNext={() => {
                    this.nextQuestion();
                }}
                showNextButton={this.state.checked}
            >
                <div className="typeTwentyTwo">
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-8">
                                <div className="text-center">
                                {this._javisrender()}
                                    <img
                                        src="/images/homework/test-8/starter/1.png"
                                        className="h-auto"
                                        alt=""
                                        style={{
                                            width: '200px'
                                        }}
                                    />
                                </div>
                                <p className="question mt-4">
                                    Beaches are next to the{' '}
                                    <span className="answer mb-2">
                                        <input type="text" placeholder=" " value="sea" disabled />
                                    </span>
                                    . People like going to the beach. They wear{' '}
                                    <span className="answer mb-4">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={this.state.a1}
                                            ref={e => (this.inputText = e)}
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
                                    on the heads. Some people go to sleep and some sit and read{' '}
                                    <span className="answer mb-4">
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
                                    there. Children run on the{' '}
                                    <span className="answer mb-4">
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
                                    or play{' '}
                                    <span className="answer mb-4">
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
                                    </span>
                                    <br />
                                    with their friends.{' '}
                                    <span className="answer mb-4">
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
                                    live in the water and children like catching them.
                                    <br />
                                    You can find beautiful shells on beaches too.
                                </p>
                            </div>
                            <div className="col-md-4">
                                <div
                                    className="row text-center text-dark font-weight-bold mx-auto"
                                    style={{ maxWidth: 300 }}
                                >
                                    {this.state.listAnswer.map((item, index) => (
                                        <div key={index.toString()} className="col-md-6 mb-3">
                                            <img
                                                src={item.src}
                                                className="w-100 h-auto"
                                                style={{ maxWidth: 200 }}
                                                alt=""
                                                draggable={false}
                                            />
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

StarterEight.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default StarterEight;

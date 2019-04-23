import React from 'react';
import { withRouter } from 'react-router';
import Route from 'src/helpers/Route';
import TestResult from './TestResult';


import Artyom from 'artyom.js';
import ArtyomCommandsManager from 'src/helpers/ArtyomCommands';

const Jarvis = new Artyom();

var starter_triger = 'this_is_the_trigger_for_starter_test'


class Results extends React.PureComponent {


    state = {
        image: '',
        text: '',
        serverHistory: [],
        checked: null,
        showTest: false
    };
    status_speech_recognition = false;
    show = false;


    componentDidMount() {
        this.startAssistant();
        //trigger dialogflow for starter test
        this.send(starter_triger);
    }

    postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => response.json()); // parses JSON response into native Javascript objects
    }


    send(q) {
        this.status_speech_recognition = false;
        this.postData('https://ai.kidtopi.com/gateway/?format=true', {
            q: q,
            session_id: '4329eb00-5c15-11e9-a629-69e32f7a3159',
            lang: 'en'
        })
            .then(data => {
                // console.log(JSON.stringify(data));

                this.show = true;
                if (this.state.image == '' && data.components[0].name == 'IMAGE') {
                    this.setState({
                        image: data.components[0].content.imageUri,
                        text: data.components[1].content
                    });
                }
                if (data.components[0].name == 'DEFAULT') {
                    this.setState({
                        text: data.components[0].content
                    });
                }
                this.textToSpeech(this.state.text);
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
    }

    startAssistant() {
        let _this = this;

        console.log("Artyom succesfully started !");

        Jarvis.initialize({
            lang: "en-GB",
            debug: true,
            continuous: true,
            soundex: true,
            listen: true
        }).then(() => {
            // Display loaded commands in the console
            console.log(Jarvis.getAvailableCommands());

            Jarvis.say("Hello there, welcome to Topi Speaking Test");

            _this.setState({
                artyomActive: true
            });
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });

        Jarvis.redirectRecognizedTextOutput((recognized,isFinal) => {
            if(isFinal){
                this.setState({
                    speech_result_final: recognized
                })
                this.send(recognized);

            }else{
                this.setState({
                    speech_result: recognized
                })
                console.log(recognized)

            }
        });

        let CommandsManager = new ArtyomCommandsManager(Jarvis);
        CommandsManager.loadCommands();

        Jarvis.say((text) => {
            console.log(text);

        });

    }

    stopAssistant() {
        let _this = this;

        Jarvis.fatality().then(() => {
            console.log("Jarvis has been succesfully stopped");

            _this.setState({
                artyomActive: false
            });

        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen neither!", err);

            _this.setState({
                artyomActive: false
            });
        });
    }

    speakText() {
        let _this = this;

        _this.setState({
            artyomIsReading: true
        });

        // Speak text with Artyom
        Jarvis.say( _this.state.textareaValue, {
            onEnd() {
                _this.setState({
                    artyomIsReading: false
                });
            }
        });
    }


    textToSpeech(text) {
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        speech.onend = () => {
            this.status_speech_recognition = true;
        };
        console.log(this.status_speech_recognition);
    }

    renderQuestion() {
        if (this.show) {
            return (
                <div className="col-md-7 text-center">
                    <h2 className="text-white">{this.state.text}</h2>
                    <p className="mb-2">
                        <img src={this.state.image} alt="" style={{ width: 350 }} />
                    </p>
                </div>
            );
        }
    }

    _renderSpeechtoText() {


        const divStyle = {
            zIndex: 999999
        };


        return (



            <div className="lesson_copy" style={divStyle}>
                <div className="">
                    <div className="title">Realtime debug: {this.state.speech_result}</div>
                    <div className="title">NLP Processed: {this.state.speech_result_final}</div>
                </div>
            </div>

        );
    }

    _javisrender() {

        const divStyle = {
            zIndex: 999999
        };

        return (
            <div className="javis" style={divStyle}>

                <input type="button" value="Start Listening" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
                <input type="button" value="Stop Listening" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>

            </div>
        )
    }


    render() {
        if (this.state.showTest) {
            return <TestResult />;
        }

        return (
            <div className="finishHomeWorkWrap py-5 d-flex justify-content-center align-items-center flex-column">
                <div className="fz-50 text-white font-weight-bold mb-4">Kidtopi Speaking Test</div>

                <div className="typeTwentySeven w-100">
                    <div className="container">
                        <div className="row justify-content-center">{this.renderQuestion()}</div>
                        {this._renderSpeechtoText()}
                        {this._javisrender()}
                    </div>
                </div>

                {/*<div className="text-center">*/}
                    {/*<img style={{ width: '80%' }} src="/images/goodjob.png" alt="" />*/}
                {/*</div>*/}

                {/*<div className="fz-40 text-white font-weight-bold mt-4 text-center px-5">*/}
                    {/*Cảm ơn bé đã hoàn thành bài kiểm tra,*/}
                    {/*<br /> chúng tôi sẽ liên hệ lại để thông báo kết quả trong thời gian sớm nhất*/}
                {/*</div>*/}

                {/* <div className="text-center mt-4">
                    <button
                        className="btn-3d btn-white btn-rounded fz-26"
                        style={{ textTransform: 'inherit' }}
                        onClick={() => {
                            // this.setState({
                            //     showTest: !this.state.showTest
                            // });
                            this.props.history.push(Route.home);
                        }}
                    >
                        Báo cáo kiểm tra
                    </button>
                </div> */}
            </div>
        );
    }
}

export default withRouter(Results);

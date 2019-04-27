import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authAction from 'src/modules/account/redux/actions/account';
import { bindActionToPromise } from 'src/helpers/Common';

import styles from './style.module.css';


import uuid from "uuid";
import { ReactMic } from 'react-mic';


import Artyom from 'artyom.js';
import ArtyomCommandsManager from 'src/helpers/ArtyomCommands';



const Jarvis = new Artyom();

var starter_triger = 'start_trigger';

var pronun_start = "pronun_trigger_1";

class LoginLayout extends PureComponent {

    constructor (props, context){
        super(props, context);

        // Add `this` context to the handler functions
        this.startAssistant = this.startAssistant.bind(this);
        this.stopAssistant = this.stopAssistant.bind(this);

        // Prepare simple state
        this.state = {
            artyomActive: false,
            artyomIsReading: false
        };

    }
    state = {
        image: '',
        text: '',
        serverHistory: [],
        checked: null,
        showTest: false,
        jarvis_say: '',
        record: false,
        status_pronunciation: false,
        status_change_question: false

    };

    show = false;
    session_id = uuid.v4();
    score = "";
    pronunciation_text = "";
    next_test_quesion = "";
    next_pronun_question = "";
    student_total_point = 0;
    current_question = "";

    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkPronunciation(blob, input_text) {
        var filename = new Date().toISOString();
        var fd=new FormData();
        fd.append("text", input_text );
        fd.append("file",blob, filename);

        var url_api = "https://ai.kidtopi.com/api/v1/pronunciation/";
        this.postData(url_api, fd, 'FormData')
          .then(data => {
              let score = data.text_score.quality_score;
              let text_new = "";
              if (score >= 80){
                  text_new = 'Good job, your pronunciation is ' + score + '% like Native Speaker. ';
              }
              else if (score > 50) {
                  text_new = 'That sound good, your pronunciation is ' + score + '% like Native Speaker. You can try again.'
              } else {
                  text_new = "That doesn't sound good, your pronunciation is " + score + "% like Native Speaker. You can try again."
              }
              this.setState({
                  text: text_new,
                  status_pronunciation: false
              })
          })
          .catch(error => {
              console.error(error);
              let text_new = "That doesn't sound good, your pronunciation is " + this.getRndInteger(40, 50) + "% like Native Speaker. You can try again.";
              this.setState({
                  text: text_new,
                  status_pronunciation: false
              })
          });
    }
    onStop= (blobObject) => {
        console.log('recordedBlob is: ', blobObject);
        this.checkPronunciation(blobObject.blob, this.pronunciation_text);
    };

    componentDidMount() {
        // this.startAssistant();
        this.startAssistant();
        //trigger dialogflow for starter test
        this.send(starter_triger);
    }

    postData(url = '', data, type='json') {
        if (type == 'json'){
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
        else {
            return fetch(url, {
                method: 'POST',
                body: data
            }).then(response => response.json());
        }
    }

    send(q) {

        this.setState({
            status_pronunciation: false
        })
        this.postData('https://ai.kidtopi.com/gateway/?format=true', {
            q: q,
            session_id: this.session_id,
            lang: 'en'
        })
          .then(data => {
              this.handle(data)
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
    }

    handle(data){
        this.show = true;
        // hiển thị duy nhất 1 ảnh và respon ở 1 dòng
        let img = '';
        let text_new = '';
        for (let component in data.components){
            if (data.components[component].name == 'IMAGE') {
                if (this.state.image != data.components[component].content.imageUri){
                    img =  data.components[component].content.imageUri
                }
            }
            if (data.components[component].name == 'DEFAULT') {
                if (text_new.length == 0){
                    text_new = data.components[component].content
                }
                else {
                    text_new += " " + data.components[component].content
                }
            }
            if (data.components[component].name == 'PAYLOAD') {

                if (data.components[component].content.fields.hasOwnProperty('current_question')){
                    this.current_question = data.components[component].content.fields.current_question.stringValue;
                    this.next_test_quesion = data.components[component].content.fields.next_test_quesion.stringValue;
                    this.student_point = data.components[component].content.fields.student_point.stringValue;
                    console.log(this.student_point + "   student point");
                    if(this.student_point == "1"){
                        console.log("trueeeee + 1");
                        this.state.student_total_point += 1;
                    }
                    if(this.student_point == "0.5") {
                        console.log("trueeeee + 0.5")
                        this.state.student_total_point += 0.5;

                    }
                    this.setState({
                        status_change_question: true,
                        next_test_quesion: this.next_test_quesion,
                        current_question: this.current_question,
                    })
                }

                if (data.components[component].content.fields.hasOwnProperty('pronunciation_text')){
                    this.pronunciation_text = data.components[component].content.fields.pronunciation_text.stringValue;
                    this.setState({
                        status_pronunciation: true,
                        next_pronun_question: this.next_pronun_question
                    })
                }
            }
        }
        if (img.length > 0){
            this.setState({
                image: img,
                text: text_new
            })
        }
        else {
            this.setState({
                text: text_new
            })
        }
        this.textToSpeech(this.state.text);
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

            _this.setState({
                artyomActive: true
            });
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });

        Jarvis.redirectRecognizedTextOutput((recognized,isFinal) => {
            if(isFinal){
                if (this.state.status_pronunciation){
                    this.setState({
                        speech_result_final: recognized
                    });
                    this.stopRecording();
                }
                else {
                    // noi xong
                    this.setState({
                        speech_result_final: recognized
                    });
                    this.send(recognized);
                }

            }
            else {
                this.setState({
                    speech_result: recognized
                });
                console.log(recognized)

            }
        });

        Jarvis.emptyCommands();
        let CommandsManager = new ArtyomCommandsManager(Jarvis);
        CommandsManager.loadCommands();
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

    textToSpeech(text) {
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        speech.onend = () => {
            if (this.state.status_pronunciation){
                this.startRecording();
            }
        };
    }

    next_question_click = () => {
        if (this.state.status_change_question){
            this.send(this.state.next_test_quesion);
        }
        if(this.state.status_pronunciation){
            this.send(this.state.next_pronun_question);
        }
    }

    renderQuestion() {
        if (this.show) {
            if (this.state.image.length > 0){
                return (
                  <div className="col-md-7 text-center">
                      <h2 className="text-white">{this.state.text}</h2>
                      <p className="mb-2">
                          <img src={this.state.image} alt="" style={{ width: 350 }} />
                      </p>
                  </div>
                );
            }
            return (
              <div className="col-md-7 text-center">
                  <h2 className="text-white">{this.state.text}</h2>
                  <p className="mb-2">
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
              <ReactMic
                record={this.state.record}
                onStop={this.onStop}
                hidden='hidden'/>
              <button onTouchTap={this.startRecording} type="button">Start</button>
              <button onTouchTap={this.stopRecording} type="button">Stop</button>
              <button onClick={this.next_question_click}>
                  Next Question
              </button>
          </div>

        )
    }


    render() {

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

          </div>
        );
    }
}



export default connect()(LoginLayout);

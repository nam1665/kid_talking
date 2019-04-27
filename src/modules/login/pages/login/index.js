import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authAction from 'src/modules/account/redux/actions/account';
import { bindActionToPromise } from 'src/helpers/Common';

import styles from './style.module.css';
import { withRouter } from 'react-router-dom';


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
                console.log("next question is " + this.state.next_test_quesion);
                console.log("status question is " + this.state.status_change_question);


                if (data.components[component].content.fields.hasOwnProperty('pronunciation_text')){
                    this.pronunciation_text = data.components[component].content.fields.pronunciation_text.stringValue;
                    this.next_pronun_question = data.components[component].content.fields.next_pronun_question.stringValue;
                    this.setState({
                        status_pronunciation: true,
                        next_pronun_question: this.next_pronun_question
                    })
                }

                console.log("next pronun question is " + this.state.next_pronun_question);
                console.log("status question is " + this.state.status_pronunciation);
                console.log("student total point is " + this.state.student_total_point);

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
        this.stopAssistant();

        this.textToSpeech(this.state.text);

    }


    textToSpeech(text) {
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        speech.onend = () => {

            if (this.state.status_pronunciation){
                this.startRecording();
            }

            if (this.state.status_change_question){
                this.send(this.state.next_test_quesion);
            }
            this.setState({
                status_change_question: false
            });

            if(this.state.text.includes("Native Speaker")) {
                this.send(this.state.next_pronun_question);
            }
            this.startAssistant();
        };
    }

    startAssistant() {

        let _this = this;

        console.log("Artyom succesfully started !");

        Jarvis.initialize({
            lang: "en-US",
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
                    })
                    this.stopRecording();
                }
                else {
                    this.setState({
                        speech_result_final: recognized,
                        speech_status: 'speech sent'
                    })
                    this.send(recognized);
                }
            }else{
                this.setState({
                    speech_result: recognized,
                    speech_status: 'not stopped yet'
                })
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

    startRecording = () => {
        this.setState({
            record: true
        });
    }

    stopRecording = () => {
        this.setState({
            record: false
        });
    }

    setText(){
        this.setState({
            text: this.score,
            status_pronunciation: false
        })
    }

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
                  text_new = 'Very good, your pronunciation is ' + score + '% like Native Speaker.';
                  this.setState({
                      image: 'https://www.stampsdirect.co.uk/media/product/41b/clixstamper-very-good-thumb-e40.png'
                  });
              }
              else if(score < 80 && score > 60 ) {
                  this.setState({
                      image:'https://thumbs.dreamstime.com/z/ch%C5%82opiec-pokazuje-kciuk-w-g%C3%B3r%C4%99-sukces-r%C4%99ki-znaka-gesta-45065761.jpg'
                  });
                  text_new = 'So close, you got ' + score + '% like Native Speaker.';
              }
              else  {
                  text_new = 'Oops, that doesn\'t sound good, you only pronounce ' + score + '% like Native Speaker.';
                  this.setState({
                      image:'http://cdn-ugc.mamaslatinas.com/gen/constrain/500/500/80/2013/08/21/15/2j/v4/po6ixb12g4.jpg'
                  });
              }

              this.textToSpeech(text_new);
              this.setState({
                  text: text_new,
                  status_pronunciation: false
              })
          })
          .catch(error => {
              let score = this.getRndInteger(50, 90);

              let text_new = "";
              if (score >= 80){
                  text_new = 'Very good, your pronunciation is ' + score + '% like Native Speaker.';
                  this.setState({
                      image: 'https://www.stampsdirect.co.uk/media/product/41b/clixstamper-very-good-thumb-e40.png'
                  });
              }
              else if(score < 80 && score > 60 ) {
                  this.setState({
                      image:'https://thumbs.dreamstime.com/z/ch%C5%82opiec-pokazuje-kciuk-w-g%C3%B3r%C4%99-sukces-r%C4%99ki-znaka-gesta-45065761.jpg'
                  });
                  text_new = 'So close, you got ' + score + '% like Native Speaker.';
              }
              else  {
                  text_new = 'Oops, that doesn\'t sound good, you only pronounce ' + score + '% like Native Speaker.';
                  this.setState({
                      image:'http://cdn-ugc.mamaslatinas.com/gen/constrain/500/500/80/2013/08/21/15/2j/v4/po6ixb12g4.jpg'
                  });
              }
              this.textToSpeech(text_new);
              this.setState({
                  text: text_new,
                  status_pronunciation: false
              });
              console.error(error);
          });
    }


    onStop= (blobObject) => {
        console.log('recordedBlob is: ', blobObject);
        this.checkPronunciation(blobObject.blob, this.pronunciation_text);
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
                  <div className="title">Speak Status: {this.state.speech_status}</div>
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
              <div className="hidden" style={divStyle} hidden>
                  <ReactMic
                    record={this.state.record}
                    onStop={this.onStop}
                    hidden='hidden'/>
                  <button onTouchTap={this.startRecording} type="button">Start</button>
                  <button onTouchTap={this.stopRecording} type="button">Stop</button>
              </div>
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

// LoginLayout.propTypes = {
//     loginAction: PropTypes.func
// };
//
// const mapStateToProps = state => {
//     return state;
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         loginAction: bindActionToPromise(dispatch, authAction.login)
//     };
// };

export default connect(
)(LoginLayout);

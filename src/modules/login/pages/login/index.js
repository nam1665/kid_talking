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
    state = {
        image: '',
        text: '',
        serverHistory: [],
        checked: null,
        showTest: false,
        record: false,
        status_text_similaty: false,
        status_pronunciation: false
    }
    text_similaty = "";
    pronunciation_text = "";
    show = false;
    session_id = uuid.v4();

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

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkTextSimilaty(input_text1, input_text2) {
        var fd=new FormData();
        fd.append("text1", input_text1 );
        fd.append("text2", input_text2);
        this.postData('https://ai.kidtopi.com/api/v1/text_similarity/', fd, 'FormData')
          .then(data => {
              let score = data.pred;
              let text_new = "";
              if (score >= 50){
                  text_new = 'Good job, your answer is ' + score + '%';
              }
              else {
                  text_new = "That doesn't sound good, your answer is " + score + "%"
              }
              this.setState({
                  text: text_new,
                  status_text_similaty: false
              })
          })
          .catch(error => console.error(error));
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
    }

    componentDidMount() {
        this.startAssistant();
        this.send(pronun_start);
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
        this.postData('https://e60e576c.ngrok.io/?format=true', {
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
                if (data.components[component].content.fields.hasOwnProperty('pronunciation_text')){
                    this.pronunciation_text = data.components[component].content.fields.pronunciation_text.stringValue;
                    this.setState({
                        status_pronunciation: true
                    })
                }
                if (data.components[component].content.fields.hasOwnProperty('text_similaty')){
                    this.text_similaty = data.components[component].content.fields.text_similaty.stringValue;
                    this.textToSpeech(this.text_similaty);
                    this.setState({
                        status_text_similaty: true
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

            Jarvis.say("Hello there, welcome to Topi Speaking Test");

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
                else if(this.state.status_text_similaty){
                    this.setState({
                        speech_result_final: recognized
                    })
                    this.checkTextSimilaty(this.text_similaty, recognized);
                }
                else {
                    // noi xong
                    this.setState({
                        speech_result_final: recognized
                    })
                    this.send(recognized);
                }

            }
            else {
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
            if (this.state.status_pronunciation){
                this.startRecording();
            }
        };
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
          <div className="javis" style={divStyle} hidden>
              <input type="button" value="Start Listening" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
              <input type="button" value="Stop Listening" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>
              <ReactMic
                record={this.state.record}
                onStop={this.onStop}
                hidden='hidden'/>
              <button onTouchTap={this.startRecording} type="button">Start</button>
              <button onTouchTap={this.stopRecording} type="button">Stop</button>
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

import React, { useState, useCallback } from 'react'

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import uuid from "uuid";
import { ReactMic } from 'react-mic';
import Container from '../../Container'


import Artyom from 'artyom.js';
import ArtyomCommandsManager from 'src/helpers/ArtyomCommands';

import ReactDOM from 'react-dom'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const Jarvis = new Artyom();

var starter_triger = 'start_trigger';

var pronun_start = "pronun_trigger_1";


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
var today = dd + '/' + mm + '/' + yyyy;




class Layout extends React.PureComponent {

  constructor (props, context){
    super(props, context);
    // Add `this` context to the handler functions
    this.startAssistant = this.startAssistant.bind(this);
    this.stopAssistant = this.stopAssistant.bind(this);
    this.move_counterHanlder = this.move_counterHanlder.bind(this)
    this.studen_move_answerHanlder = this.studen_move_answerHanlder.bind(this)
    this.studen_reset_move = this.studen_reset_move.bind(this)


    // Prepare simple state
    this.state = {
      artyomActive: false,
      artyomIsReading: false,
      move_count : 0
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
    status_change_question: false,
    open_mic_pronun: false,
    speech_status: "Stop Listening",
    status_drag: false,
    on_dragging: false,
  };

  show = false;
  session_id = uuid.v4();
  pronunciation_text = "";
  next_test_quesion = "";
  next_pronun_question = "";
  current_question = "";
  background_img = "";
  object_img = "";
  componentDidMount() {
    this.send('question_22_trigger');
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
    this.stopAssistant();
    this.setState({
      status_pronunciation: false,
      status_change_question: false
    });
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

          if(this.student_point == "1"){
            this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
              question_id: this.current_question,
              session_id: this.session_id,
              answer: 'right',
              point: 1,
              test_level: 'starter',
              date: today,
              time: time
            })
              .then(data => {
              }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
          }
          if(this.student_point == "0.5") {
            this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
              question_id: this.current_question,
              session_id: this.session_id,
              answer: 'right',
              point: 0.5,
              test_level: 'starter',
              date: today,
              time: time
            })
              .then(data => {
              }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
          }
          if(this.student_point == "0") {
            this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
              question_id: this.current_question,
              session_id: this.session_id,
              answer: 'wrong',
              point: 0,
              test_level: 'starter',
              date: today,
              time: time
            })
              .then(data => {
              }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
          }

          this.setState({
            status_change_question: true,
            next_test_quesion: this.next_test_quesion,
            current_question: this.current_question,
          })
        }

        if (data.components[component].content.fields.hasOwnProperty('pronunciation_text')){
          this.stopAssistant();
          this.pronunciation_text = data.components[component].content.fields.pronunciation_text.stringValue;
          this.next_pronun_question = data.components[component].content.fields.next_pronun_question.stringValue;
          this.setState({
            status_pronunciation: true,
            next_pronun_question: this.next_pronun_question
          })
        }


        if (data.components[component].content.fields.hasOwnProperty('drag_question')){
          this.next_test_quesion = data.components[component].content.fields.next_test_quesion.stringValue;
          this.background_img = data.components[component].content.fields.background_img.stringValue;
          this.object_img = data.components[component].content.fields.object_img.stringValue;
          this.left_larger = data.components[component].content.fields.left_larger.numberValue;
          this.left_smaller = data.components[component].content.fields.left_smaller.numberValue;
          this.top_larger = data.components[component].content.fields.top_larger.numberValue;
          this.top_smaller = data.components[component].content.fields.top_smaller.numberValue;

          this.setState({
            status_drag: true,
            on_dragging: true,
            next_test_quesion: this.next_test_quesion,
            background_img: this.background_img,
            object_img: this.object_img,
            hidepicture: true,
            left_larger: this.left_larger,
            left_smaller: this.left_smaller,
            top_larger: this.top_larger,
            top_smaller: this.top_smaller
          });
        }

        if (data.components[component].content.fields.hasOwnProperty('show_score')){
          this.get_test_result(this.session_id);
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
    if(this.state.status_pronunciation){
      this.pronun_textToSpeech(text_new);
    }
    else{
      this.textToSpeech(text_new)
    }

  }


  pronun_textToSpeech(pronun_text) {
    let speech = new SpeechSynthesisUtterance(pronun_text);
    window.speechSynthesis.speak(speech);
    speech.onend = () => {

      this.startAssistant();
      setTimeout(
        function() {
          this.startRecording();
        }
          .bind(this),
        2000
      );
      if(this.state.text.includes("Native Speaker")) {
        this.send(this.state.next_pronun_question);
      }

    };
  }


  drag_textToSpeech(drag_text) {
    let speech = new SpeechSynthesisUtterance(drag_text);
    window.speechSynthesis.speak(speech);
    speech.onend = () => {

      if(this.state.drag_finish){
        this.setState({
          status_drag: false,
          hidepicture: false,
          drag_finish: false,
          move_count: 0,
          student_move: false,
          end_drag: false
        });
        this.send(this.state.next_test_quesion);
      }

    };
  }

  textToSpeech(text) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    speech.onend = () => {

      this.startAssistant();

      setTimeout(
        function() {
          this.startRecording();
        }
          .bind(this),
        1000
      );

      if (this.state.status_change_question){
        this.send(this.state.next_test_quesion);
      }
      this.setState({
        status_change_question: false
      });

      if(this.state.status_drag) {
        this.stopAssistant();
      }
    };
  }

  startAssistant() {

    let _this = this;

    Jarvis.initialize({
      debug: true,
      continuous: true,
      listen: true
    }).then(() => {
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
          this.stopAssistant();
          setTimeout(
            function() {
              this.stopRecording();
            }
              .bind(this),
            500
          );
        }
        else {
          this.setState({
            speech_result_final: recognized,
            speech_status: 'Stop Listening'
          });
          this.stopAssistant();
          setTimeout(
            function() {
              this.stopRecording();
            }
              .bind(this),
            500
          );
          this.send(recognized);
          this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
            question_id: parseInt(this.current_question, 10) + 1,
            session_id: this.session_id,
            student_answer: recognized,
            test_level: 'starter',
            date: today,
            time: time
          })
            .then(data => {
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
        }
      }else{
        this.setState({
          speech_result: recognized,
          speech_status: 'Listening'
        });
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
        artyomActive: false,
      });
    });
  }

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

        this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
          question_id: this.current_question,
          session_id: this.session_id,
          pronun_word: this.pronunciation_text,
          point: score,
          test_level: 'pronunciation',
          date: today,
          time: time
        })
          .then(data => {
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));

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

        this.pronun_textToSpeech(text_new);

        this.setState({
          text: text_new,
          status_pronunciation: false
        })
      })
      .catch(error => {
        let score = this.getRndInteger(50, 90);

        this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
          question_id: this.current_question,
          session_id: this.session_id,
          pronun_word: this.pronunciation_text,
          point: score,
          test_level: 'pronunciation',
          date: today,
          time: time
        })
          .then(data => {
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));

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
        this.pronun_textToSpeech(text_new);
        this.setState({
          text: text_new,
          status_pronunciation: false
        });
        console.error(error);
      });
  }

  upload_recordfile(blob, session_id, question_id) {
    var filename = new Date().toISOString();
    var fd=new FormData();
    fd.append("file",blob, filename);
    fd.append("session_id", session_id );
    fd.append("info", question_id);


    var url_api = "https://ai.kidtopi.com/api/v1/storage_file/";
    this.postData(url_api, fd, 'FormData')
      .then(data => {
      })
      .catch(error => {
        console.error(error);
      });
  }

  get_test_result(session_id) {
    var fd=new FormData();
    fd.append("session_id", session_id );

    var url_api = "https://ai.kidtopi.com/get_result_speaking_test/";
    this.postData(url_api, fd, 'FormData')
      .then(data => {
        let student_point_final = data.sum;
        let text_new = "";
        if(student_point_final < 12 ){
          text_new = "Your score is " + student_point_final/10*22 + " . Your result is not good, but don't worry, let's practice more, it will be better";
        }
        else if (student_point_final < 17) {
          text_new = "Your score is " + student_point_final/10*22 + " . You did a good job today, but don't remember to practice more, I think you can do better next time";

        }
        else {
          text_new = "Your score is " + student_point_final/10*22 +  " . Excellent job, I'm proud of you, your mother proud of you, your bros proud of you, everyone proud of you";
        }
        this.textToSpeech(text_new);
        console.log("test point", data.sum);
      })
      .catch(error => {
        console.error(error);
      });
  }


  onStop= (blobObject) => {
    console.log('recordedBlob is: ', blobObject);
    if (this.state.status_pronunciation) {
      this.checkPronunciation(blobObject.blob, this.pronunciation_text);
    }
    else {
      this.upload_recordfile(blobObject.blob, this.session_id, this.state.current_question);
    }
  };

  next_question_click = () => {

    if(this.state.status_pronunciation){
      this.send(this.state.next_pronun_question);
    }
    else {
      this.send(this.state.next_test_quesion);
      this.setState({
        status_drag: false,
        hidepicture: false,
        drag_finish: false,
        move_count: 0,
        student_move: false,
        end_drag: false
      });
    }



  };


  renderQuestion() {
    if (this.show) {
      return (
        <div className="col-md-7 text-center">
          <h2 className="text-white">{this.state.text}</h2>
          <p className="mb-2">
            <img hidden={this.state.hidepicture} src={this.state.image} alt="" style={{ width: 550 }} />
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
          {/*<div className="title">Speak Status: {this.state.speech_status}</div>*/}
          <button hidden={this.state.speech_status == "Stop Listening"}>
            <img src={'https://upload.wikimedia.org/wikipedia/commons/0/06/Mic-Animation.gif'} alt="" style={{ width: 50 }} />
          </button>
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

        <button disabled={this.state.artyomActive} onClick={this.startAssistant}>
          <img src={'https://img.icons8.com/ios/2x/block-microphone-filled.png'} alt="" style={{ width: 50 }} />
        </button>
        <button disabled={!this.state.artyomActive} onClick={this.stopAssistant}>
          <img src={'https://www.freeiconspng.com/minicovers/microfono-microphone-icon-coloring-book-colouring-xanthochroi---2.png'} alt="" style={{ width: 50 }} />
        </button>
        <div>
          <button onClick={this.next_question_click}>
            <text>Please click it when the test is frozen</text>
            <img src={'https://thumbs.gfycat.com/WellinformedRealisticConch-small.gif'} alt="" style={{ width: 50 }} />
          </button>
        </div>
        {/*<input type="button" value="Microphone Off" disabled={this.state.artyomActive} onClick={this.startAssistant} />*/}
        {/*<input type="button" value="Microphone On" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>*/}
        <div className="hidden" style={divStyle} hidden>
          <ReactMic
            record={this.state.record}
            onStop={this.onStop}
            hidden='hidden'/>
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        </div>
      </div>


    )
  }


  move_counterHanlder(dataFromChild) {
    // log our state before and after we updated it
    this.setState({
      move_count: dataFromChild
    });

  }

  studen_reset_move(dataFromChild) {
    // log our state before and after we updated it
    this.setState({
      reset_move: dataFromChild
    });
    console.log("reset move from child   " + this.state.reset_move)
  }

  studen_move_answerHanlder(location_data) {
    // log our state before and after we updated it
    this.setState({
      student_move: location_data
    });

    if(this.state.move_count == 1) {
      if(this.state.student_move){
        let text_new = "Awesome, your answer is correct";
        this.setState({
          text: text_new,
          on_dragging: false,
          drag_finish: true,
          reset_move: true
        });
        this.drag_textToSpeech(text_new);

      }
      else{
        let text_new = "Oops, not correct, let try again";
        this.setState({
          text: text_new,
          on_dragging: true
        });
        this.drag_textToSpeech(text_new)
      }
    }
    if(this.state.move_count == 2) {
      if(this.state.student_move){
        let text_new = "Awesome, now it is correct";
        this.setState({
          text: text_new,
          on_dragging: false,
          drag_finish: true,
          reset_move: true
        });
        this.drag_textToSpeech(text_new);

      }
      else{
        let text_new = "Oh no, not correct, you can try one more time";
        this.setState({
          text: text_new,
          on_dragging: true
        });
        this.drag_textToSpeech(text_new)
      }
    }
    if(this.state.move_count == 3) {
      if(this.state.student_move){
        let text_new = "Well done, now it is correct";
        this.setState({
          text: text_new,
          on_dragging: false,
          drag_finish: true,
          reset_move: true
        });
        this.drag_textToSpeech(text_new);

      }
      else{
        let text_new = "Oops, still wrong, try next time, now let move to the new question";
        this.setState({
          text: text_new,
          on_dragging: false,
          drag_finish: true,
          reset_move: true,
        });
        this.drag_textToSpeech(text_new);

      }

      this.stopAssistant();

    }

    if(this.state.student_move){
      this.postData('https://topkid.tradersupport.club:8443/add/speaking_test_kidtopi', {
        question_id: this.current_question,
        session_id: this.session_id,
        answer: 'right',
        point: 1,
        test_level: 'starter',
        date: today,
        time: time,
        student_answer: 'drag n drop question'
      })
        .then(data => {
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    }

    this.setState({
      drag_finish: this.state.drag_finish
    });

  }



  _dragrender() {
    return (
      <div hidden={!this.state.status_drag}>
        <DragDropContextProvider backend={HTML5Backend}>
          <Container
            background_img = {this.state.background_img}
            object_img={this.state.object_img}
            reset_move = {this.state.reset_move}
            left_larger={this.state.left_larger}
            left_smaller={this.state.left_smaller}
            top_larger={this.state.top_larger}
            top_smaller={this.state.top_smaller}
            action={this.move_counterHanlder}
            action2={this.studen_move_answerHanlder}
            action3={this.studen_reset_move}

          />
        </DragDropContextProvider>
      </div>
    )
  }


  render() {

    return (
      <div className="finishHomeWorkWrap py-5 d-flex justify-content-center align-items-center flex-column">
        <div className="fz-50 text-white font-weight-bold mb-4">Kidtopi Speaking Test</div>
        {this._dragrender()}

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


export default withRouter(Layout);

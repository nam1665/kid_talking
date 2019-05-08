import React from 'react';
import _ from 'lodash';
import DefaultLayout from '../../DefaultLayout';

import uuid from "uuid";
import Artyom from 'artyom.js';
import ArtyomCommandsManager from 'src/helpers/ArtyomCommands';

const Jarvis = new Artyom();

class BaseLayer extends React.Component {
    num_not_do= 0
    trigger_not_do = 'trigger_not_do';
    trigger_confirm = 'trigger_confirm';
    session_id = uuid.v4();
    status_wait = false;
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
        if (q == this.trigger_confirm){
            this.status_wait = false;
        }
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
        let text_new = '';
        // pause Assistant
        this.setState({
            artyomActive: false
        });
        for (let component in data.components){
          if (data.components[component].name == 'DEFAULT') {
            if (text_new.length == 0){
              text_new = data.components[component].content
            }
            else {
              text_new += " " + data.components[component].content
            }
          }
          if (data.components[component].name == 'PAYLOAD') {
            if (data.components[component].content.fields.hasOwnProperty('trigger_confirm')){
              let result = data.components[component].content.fields.trigger_confirm.stringValue;
              if (result == 'true'){
                this.nextQuestion();
              }
              if (result == 'false'){
                  this.stopAssistant();
                  this.num_not_do = 0;
                  this.status_wait = true;
                  this.wait();
              }
            }
          }
        }
        this.textToSpeech(text_new);    
    }

    setDefault(){
        this.status_wait = false;
        this.num_not_do = 0;
    }
    
    wait(ms=10000){        
        this.timeout = setTimeout(() => {
            if (this.status_wait){
                console.log(this.num_not_do)
                if (this.num_not_do >= 3){
                    let text_next = "It's already 30 seconds and you haven't done anything. I will move to the next question."
                    this.textToSpeech(text_next);
                }
                else {
                    this.send(this.trigger_not_do);
                    this.num_not_do += 1;  
                }
            }
            this.status_wait = false;
        }, ms);
        
    }

    nextQuestion(){
        this.setDefault();
    }

    textToSpeech(text) {
        this.stopAssistant();
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        speech.onend = () => {
            if (text == 'Are you sure?' || text == "I don't understand. Please say again."){
                this.status_wait = false;
                this.startAssistant();                
            }
            if (text == "It's already 10 seconds and you haven't done anything.") {
                this.status_wait = true;
                this.wait();
            }
            if (text == "It's already 30 seconds and you haven't done anything. I will move to the next question."){
                this.nextQuestion();
            }
        };
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
                this.setState({
                    speech_result_final: recognized
                })
                this.send(recognized);
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
        _this.setState({
            artyomActive: false
        });
    }

    _javisrender() {
        const divStyle = {
            zIndex: 999999
        };

        return (
            <div className="javis" style={divStyle} hidden>
                <input type="button" value="Start Listening" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
                <input type="button" value="Stop Listening" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>
            </div>
        )
    }

}

export default BaseLayer;
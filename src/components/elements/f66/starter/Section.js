import React from 'react';
import DefaultLayout from '../../DefaultLayout';
import BaseLayer from './Base.js'

class Section extends BaseLayer {

    nextQuestion(){
        console.log(31313123131)
        this.setDefault();
        this.props.onNext({
            answer: ['section'],
            correct: false,
            fraction: 0
        });
    }

    componentDidMount(){
        let text = this.props.q_title.replace("[[ENTRANCE_TEST_STARTER_1:section]] ", "");
        console.log(text);
        if (text == 'Section: Reading and Writing'){
            text = 'Hello, welcome to placement test. This is the reading and writing section. Are you ready?'
        }
        if (text == 'Section: Listening'){
            text = "Happy kid finished reading and writing section. This is the listening section. Are you ready?"
        }
        this.textToSpeech(text);
    }
    
    render() {
        console.log("section 123")
        const { q_picture, onNext, ...rest } = this.props;
        return (
            <DefaultLayout
                instructorClass="d-none"
                progressClass="d-none"
                background={q_picture}
                {...rest}
                onNext={time => {
                    onNext({
                        answer: ['section'],
                        correct: false,
                        fraction: 0
                    });
                }}
            />
        );
    }
}

export default Section;

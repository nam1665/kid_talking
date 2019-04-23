import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import HomeworkLayout from '../HomeworkLayout';
import TrueFalseItem from './TrueFalseItem';

class TrueFalseAdvanced extends React.Component {
    state = {
        questions: [],
        answers: {},
        correct: false
    };

    UNSAFE_componentWillMount() {
        const { q_text } = this.props;

        const text = q_text ? q_text : '';
        const questions = text.split(/\[{2}.+?\]{2}/).filter(question => question.length > 0);

        this.setState({ questions });
    }

    onChange(value, index) {
        const { answers } = this.state;

        if (value === null) {
            delete answers[index];
        } else {
            answers[index] = value;
        }

        this.setState({
            answers: { ...answers }
        });
    }

    render() {
        const { onNext, data, q_picture, q_title, ...other } = this.props;
        const { answers, questions } = this.state;
        return (
            <HomeworkLayout
                {...other}
                title={q_title.replace('[[TF]]', '')}
                onNext={() => {
                    const { answers } = this.state;
                    const { data } = this.props;

                    let correct = false;

                    _.forEach(data, item => {
                        if (
                            (answers[item.group - 1] == true && item.text.indexOf('Yes') > -1) ||
                            (answers[item.group - 1] == false && item.text.indexOf('No') > -1)
                        ) {
                            correct = true;
                        } else {
                            correct = false;
                            return false;
                        }
                    });

                    if (onNext)
                        onNext({
                            answer: Object.keys(answers).map(item => {
                                return Number(item) + 1;
                            }),
                            correct: correct,
                            fraction: correct ? 1 : 0
                        });
                }}
                showNextButton={Object.keys(answers).length == questions.length}
            >
                <div className="typeFour mt-5 container">
                    <div className="d-flex justify-content-center flex-column">
                        {questions.map((item, index) => {
                            return (
                                <TrueFalseItem
                                    key={index}
                                    text={item}
                                    onChange={value => this.onChange(value, index)}
                                    showText={index == 0}
                                />
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

TrueFalseAdvanced.propTypes = {
    q_text: PropTypes.string,
    onNext: PropTypes.func,
    data: PropTypes.any,
    q_picture: PropTypes.string,
    q_title: PropTypes.string
};

export default TrueFalseAdvanced;

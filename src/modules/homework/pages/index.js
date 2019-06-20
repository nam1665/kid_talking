import React from 'react';
import PropTypes from 'prop-types';
import * as Elements from 'src/components/elements';
import Request from 'src/helpers/Request';
import Storage from 'src/helpers/Storage';
import _ from 'lodash';
import { getQuestionTypes, getAttachments, getAnswers, clearTags } from 'src/helpers/helper';
import Timer from 'src/components/Timer';
import axios from 'axios';
import { API_URL } from 'src/helpers/constants';
import HomeworkResult from './result';

class HomeWork extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            step: 0,
            realStep: 0,
            loading: true,
            quiz_id: null,
            showResult: false
        };

        this.quizStatus = {};
        this.attempt = {};
        this.timeStart = new Date().getTime();
    }

    async componentDidMount() {
        console.log(this.props)
        const questions = await Request.get('', {
            wsfunction: 'local_get_questions_external',
            lessionId: this.props.location.query.lesson,
            courseId: this.props.location.query.unit
        });

        if (questions.result.quiz_id) {
            const resAttempt = await Request.request({
                method: 'POST',
                params: {
                    wsfunction: 'local_questions_make_new_attempt_external',
                    userId: Storage.get('kidUserId'),
                    quizId: questions.result.quiz_id
                }
            });

            if (resAttempt.result) {
                resAttempt.result.forEach(attempt => (this.attempt[attempt.question_id] = attempt));
            }
        }

        this.setState({
            quiz_id: questions.result.quiz_id,
            questions: questions.result.questions
                .map(question => {
                    try {
                        const attachment = getAttachments(question.q_text);
                        const answers = getAnswers(question.data);

                        question.attachments = attachment;
                        question.q_picture =
                            attachment.picture && attachment.picture.length > 0 ? attachment.picture[0] : false;
                        question.q_audio =
                            attachment.sound && attachment.sound.length > 0
                                ? _.isString(attachment.sound)
                                    ? attachment.sound
                                    : attachment.sound[0]
                                : false;
                        question.data = answers;
                        question.q_text = clearTags(question.q_text);
                        question.q_pictures =
                            attachment.picture && attachment.picture.length > 1 ? attachment.picture : false;
                        question.q_video =
                            attachment.video && attachment.video.length > 0 ? attachment.video[0] : false;

                        question.componentType = getQuestionTypes(question);

                        return question;
                    } catch (e) {
                        console.log(e);
                        return question;
                    }
                })
                .filter(el => {
                    return el.componentType;
                }),
            loading: false
        });
    }

    _renderHomeWork() {
        let { step, realStep } = this.state;
        const { questions, loading } = this.state;

        if (loading) {
            return null;
        }

        if (!questions) {
            return null;
        }

        const question = questions[step];

        if (!question.componentType) {
            return null;
        }

        const QComponent = Elements[question.componentType];

        if (!QComponent) return null;

        return (
            <React.Fragment>
                <QComponent
                    key={question.q_id}
                    {...question}
                    isExample={/\[\[.*?\:example\]\]/g.test(question.q_title)}
                    totalQuestions={questions.filter(o => !/\[\[.*?\:(example|section)\]\]/g.test(o.q_title)).length}
                    current={realStep + 1}
                    onNext={async data => {
                        const mark = Number(question.q_mark) * data.fraction;
                        this.quizStatus[question.q_id] = { ...data, q: question, mark: mark || 0 };

                        step = step + 1;

                        if (!/\[\[.*?\:(example|section)\]\]/g.test(question.q_title)) {
                            realStep = realStep + 1;
                        }

                        if (step < questions.length) {
                            return this.setState({
                                step: step,
                                realStep
                            });
                        }

                        if (step >= questions.length) {
                            const qData = Object.keys(this.quizStatus).map(key => {
                                const quest = this.quizStatus[key];

                                // console.log(quest);
                                return {
                                    question_id: quest.q.q_id,
                                    attemp_id: this.attempt[quest.q.q_id].question_attempts_id,
                                    attemp_step_id: this.attempt[quest.q.q_id].attempt_steps_id,
                                    state: 'finish',
                                    data: quest.answer.join(','),
                                    fraction: Number(quest.fraction),
                                    status: quest.correct ? 'gradedright' : 'gradedwrong',
                                    mark: quest.mark
                                };
                            });

                            const formData = new FormData();

                            formData.append('moodlewsrestformat', 'json');
                            formData.append('wstoken', Storage.getAccessToken());
                            formData.append('wsfunction', 'local_questions_save_attempt_external');
                            formData.append('userId', Storage.get('kidUserId'));
                            formData.append(
                                'data',
                                JSON.stringify({
                                    quiz_id: this.state.quiz_id,
                                    type: 'test',
                                    questions: qData
                                })
                            );

                            await axios.post(API_URL, formData);

                            this.setState({
                                showResult: true
                            });
                        }
                    }}
                />
                <Timer
                    display={!/\[\[.*?\:(example|section)\]\]/g.test(question.q_title)}
                    ref={e => (this.timer = e)}
                />
            </React.Fragment>
        );
    }

    render() {
        const { showResult } = this.state;

        if (showResult) {
            return (
                <HomeworkResult
                    onClick={async () => {
                        // reset attemp id
                        const resAttempt = await Request.request({
                            method: 'POST',
                            params: {
                                wsfunction: 'local_questions_make_new_attempt_external',
                                userId: Storage.get('kidUserId'),
                                quizId: this.state.quiz_id
                            }
                        });

                        if (resAttempt.result) {
                            resAttempt.result.forEach(attempt => (this.attempt[attempt.question_id] = attempt));
                        }

                        this.setState({
                            showResult: false,
                            step: 0,
                            realStep: 0
                        });
                    }}
                    totalTrue={_.filter(_.clone(this.quizStatus), o => o.correct).length}
                    totalFalse={_.filter(_.clone(this.quizStatus), o => !o.correct).length}
                    totalTime={this.timer.getTotalTime().timeConverted}
                />
            );
        }

        return this._renderHomeWork();
    }
}

export default HomeWork;

import React from 'react';
import PropTypes from 'prop-types';
import * as Elements from 'src/components/elements';
import Request from 'src/helpers/Request';
import Storage from 'src/helpers/Storage';
import _ from 'lodash';
import { getQuestionTypes, getAttachments, getAnswers, clearTags } from 'src/helpers/helper';
import Timer from 'src/components/Timer';

class TestLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            step: 0,
            realStep: 0,
            loading: true,
            quiz_id: null
        };

        this.quizStatus = {};
        this.attempt = {};
        this.timeStart = new Date().getTime();
    }

    async UNSAFE_componentWillMount() {
        try {
            const data = await Request.get('', {
                wsfunction: 'local_get_level_kid_after_test',
                userid: Storage.get('kidUserId')
            });

            if (data.result && data.result.course_id && data.result.lesson_id) {

                let _lessionId = data.result.lesson_id;
                let _courseId = data.result.course_id;
                if (Storage.get('kidUserId') == 964){
                    _lessionId = 446;
                    _courseId = 77;
                }
                if (Storage.get('kidUserId') == 963){
                    _lessionId = 451;
                    _courseId = 78;
                }
                
                const questions = await Request.get('', {
                    wsfunction: 'local_get_questions_external',
                    lessionId: _lessionId,
                    courseId: _courseId
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

                                // question.componentType = 'StarterNine';

                                // console.log(question);

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
        } catch (e) {
            alert(e.message);
        }
    }
    render() {
        let { step, realStep } = this.state;
        const { questions, loading } = this.state;
        const { onDone } = this.props;

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
                    onNext={data => {
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

                        if (onDone) onDone(this.quizStatus, this.attempt, this.state.quiz_id);
                    }}
                />
                <Timer
                    display={!/\[\[.*?\:(example|section)\]\]/g.test(question.q_title)}
                    ref={e => (this.timer = e)}
                />
            </React.Fragment>
        );
    }
}

TestLayout.propTypes = {
    onDone: PropTypes.func
};

export default TestLayout;

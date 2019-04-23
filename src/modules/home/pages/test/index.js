import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Survey from './survey';
import Test from './test';
import Result from './result';
import { updateUserStatus } from 'src/modules/account/redux/actions/account';
import { bindActionToPromise } from 'src/helpers/Common';
import Request from 'src/helpers/Request';
import Storage from 'src/helpers/Storage';
import axios from 'axios';
import { API_URL } from 'src/helpers/constants';

class TestPage extends React.Component {
    render() {
        const { auth } = this.props;

        return (
            <div>
                <Helmet title="Test" />
                {auth.userState == 0 ? (
                    <Survey
                        onSurveyDone={async answers => {
                            try {
                                const results = Object.keys(answers).map(item => {
                                    return answers[item];
                                });

                                await Request.request({
                                    method: 'POST',
                                    params: {
                                        wsfunction: 'local_save_survey_result',
                                        userid: Storage.get('kidUserId'),
                                        questions: JSON.stringify(results)
                                    },
                                    transformResponse: [].concat(Request.defaultTranform, Request.transformResponse)
                                });

                                await Request.request({
                                    method: 'POST',
                                    params: {
                                        wsfunction: 'local_save_user_status',
                                        userid: Storage.get('kidUserId'),
                                        state: 1
                                    },
                                    transformResponse: [].concat(Request.defaultTranform, Request.transformResponse)
                                });

                                await this.props.updateUserStatus(1);
                            } catch (e) {
                                alert(e.data.message);
                            }
                        }}
                    />
                ) : auth.userState == 1 ? (
                    <Test
                        onDone={async (data, attempt, quiz_id) => {
                            try {
                                const qData = Object.keys(data).map(key => {
                                    const quest = data[key];

                                    // console.log(quest);
                                    return {
                                        question_id: quest.q.q_id,
                                        attemp_id: attempt[quest.q.q_id].question_attempts_id,
                                        attemp_step_id: attempt[quest.q.q_id].attempt_steps_id,
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
                                        quiz_id: quiz_id,
                                        type: 'test',
                                        questions: qData
                                    })
                                );

                                await axios.post(API_URL, formData);

                                // await Request.request({
                                //     method: 'POST',
                                //     params: {
                                //         wsfunction: 'local_save_user_status',
                                //         userid: Storage.get('kidUserId'),
                                //         state: 2
                                //     }
                                // });

                                await this.props.updateUserStatus(2);
                            } catch (e) {
                                alert(e.message);
                            }
                        }}
                    />
                ) : (
                    <Result />
                )}
            </div>
        );
    }
}

TestPage.propTypes = {
    auth: PropTypes.object,
    updateUserStatus: PropTypes.func
};

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => ({
    updateUserStatus: bindActionToPromise(dispatch, updateUserStatus)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPage);

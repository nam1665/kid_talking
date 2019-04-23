import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import Storage from 'src/helpers/Storage';
import Request from 'src/helpers/Request';
import { connect } from 'react-redux';
import { userSelector } from 'src/modules/account/redux/selectors';
import _ from 'lodash';

class TestResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            report: null,
            data: null,
            learningObject: [],
            testResults: null,
            feedback: null,
            isTranslator: false,
            translatedComment: '',
            inforFeedback: null,
            changed: false
        };
    }

    async componentDidMount() {
        const userid = Storage.get('kidUserId');

        const testResults = await Request.request({
            method: 'GET',
            params: {
                wsfunction: 'local_get_level_kid_after_test',
                userid: userid,
                step: 'final'
            }
        });

        const testData = await Request.request({
            method: 'get',
            params: {
                wsfunction: 'local_get_quiz_avg_external',
                userId: userid
            }
        });

        let test = null;
        let feedback = null;
        let learningObject = [];
        let report = null;
        let inforFeedback = {};

        if (testResults.result) {
            test = testResults.result;
            report = testData.result;

            if (test.roomid) {
                const feedbackRes = await Request.request({
                    method: 'get',
                    params: {
                        wsfunction: 'local_view_feedback',
                        roomid: test.roomid
                    }
                });

                const inforFeedbackResult = await Request.request({
                    method: 'get',
                    params: {
                        wsfunction: 'local_view_infor_for_feedback',
                        roomid: test.roomid
                    }
                });

                if (inforFeedbackResult.result) {
                    inforFeedback = inforFeedbackResult.result;
                }

                if (feedbackRes.result) {
                    feedback = feedbackRes.result;
                }
            }

            if (test.level_id) {
                const response = await Request.request({
                    method: 'get',
                    params: {
                        wsfunction: 'local_learning_objective_get',
                        levelId: test.level_id
                    }
                });

                if (response.result && response.result.length > 0) {
                    learningObject = response.result;
                }
            }
        }

        if (test && test.level_name && this.props.userState >= 4) {
            window.addEventListener('scroll', () => {
                if (this.state.changed) {
                    return;
                }

                const elem = document.querySelector('.report-current-level');
                const newElem = document.querySelector(
                    `.report-${this.state.testResults.level_name.replace(' ', '-').toLowerCase()}`
                );

                const level = this.state.testResults.level_name.replace(' ', '-').toLowerCase();

                if (elem && newElem) {
                    const w = elem.offsetWidth;
                    const left = elem.offsetLeft;
                    let newW = w / 1.3;

                    // count center of element
                    if (_.includes(['level-1', 'level-2', 'level-3', 'level-4'], level)) {
                        newW = w / 2.15;
                    } else if (_.includes(['level-8'], level)) {
                        newW = w;
                    }

                    if (!this.state.changed) {
                        elem.style.left = left - newW + newElem.offsetWidth + 'px';
                    }

                    this.setState({
                        changed: true
                    });
                } else if (elem) {
                    elem.style.display = 'none';
                }
            });
        }

        this.setState({
            testResults: test,
            learningObject: learningObject,
            feedback: feedback,
            report: report,
            inforFeedback: inforFeedback
        });
    }

    _translatorText(text) {
        this.setState(
            {
                isTranslator: !this.state.isTranslator
            },
            async () => {
                if (this.state.isTranslator) {
                    try {
                        const translator = await Request.post('', {
                            wsfunction: 'local_translate_text_external',
                            text: text,
                            target: 'vi',
                            source: 'en'
                        });

                        this.setState({
                            translatedComment: translator.text
                        });
                    } catch (error) {
                        alert(error.message);
                        // console.log(error);
                    }
                }
            }
        );
    }

    _getText(id, type) {
        let text = 'Bad';

        if (type == 'eng') {
            switch (id) {
                case 1:
                    text = 'Bad';
                    break;
                case 2:
                    text = 'Average';
                    break;
                case 3:
                    text = 'Excellent';
                    break;
            }
        } else {
            switch (id) {
                case 1:
                    text = 'Trung bình';
                    break;
                case 2:
                    text = 'Khá';
                    break;
                case 3:
                    text = 'Tốt';
                    break;
            }
        }

        return text;
    }

    render() {
        const { userInfo } = this.props;

        return (
            <div className="test-results">
                <div className="report-container">
                    <div
                        className="report-header"
                        // style={{  }}
                        style={{
                            backgroundImage: `url(/images/goodjob1.png)`,
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ color: '#fff', fontSize: 34 }}>KIDTOPI</h1>
                        <h2 style={{ color: '#fff', marginBottom: 20 }}>
                            is honorable to be the ideal companion in{' '}
                            <strong>{userInfo.kid_name ? `${userInfo.kid_name}'s` : ''}</strong> way of mastering
                            English ability and nurturing characteristics of the 21 st century global citizen.
                        </h2>
                        <p style={{ color: '#fff', fontStyle: 'italic' }}>
                            Chúng tôi, KIDTOPI, rất hân hạnh được là người đồng hành lý tưởng trên con đường phát triển
                            năng lực tiếng Anh và bồi dưỡng phẩm chất công dân toàn cầu thế kỷ 21 của{' '}
                            {userInfo.kid_name ? `${userInfo.kid_name}` : ''}
                        </p>
                    </div>
                    <div
                        className="report-card"
                        style={{
                            backgroundImage: `url(/images/report-bg-block.png)`
                        }}
                    >
                        <div
                            className="report-card-title"
                            style={{
                                backgroundImage: `url(/images/report-bg-button.png)`
                            }}
                        >
                            <strong>General Perfomance</strong>
                            Năng lực tổng thể
                        </div>

                        <div className="report-card-content text-left">
                            <div className="report-card-content-background">
                                <div className="row">
                                    <div className="col-3" />
                                    <div className="col-9">
                                        <div className="report-group-1 d-block float-left" />
                                        <div className="report-group-2 d-block float-left" />
                                        <div className="report-group-3 d-block float-left" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3" />
                                <div className="col-md-9">
                                    <div
                                        className="report-group-1 text-center p-2"
                                        style={{
                                            backgroundColor: `rgba(255, 170, 158, .4)`,
                                            borderRadius: '12px 12px 0 0'
                                        }}
                                    >
                                        <h2 className="m-0">
                                            Needs Work
                                            <div className="fs-12 font-weight-normal" style={{ fontSize: 13 }}>
                                                Cố thêm nhé
                                            </div>
                                        </h2>
                                    </div>
                                    <div
                                        className="report-group-2 text-center p-2"
                                        style={{
                                            backgroundColor: `rgba(255, 94, 73, .4)`,
                                            borderRadius: '12px 12px 0 0'
                                        }}
                                    >
                                        <h2 className="m-0">
                                            On Level
                                            <div className="fs-12 font-weight-normal" style={{ fontSize: 13 }}>
                                                Đạt yêu cầu
                                            </div>
                                        </h2>
                                    </div>
                                    <div
                                        className="report-group-3 text-center p-2"
                                        style={{
                                            backgroundColor: `rgba(255, 31, 0, .4)`,
                                            borderRadius: '12px 12px 0 0'
                                        }}
                                    >
                                        <h2 className="m-0">
                                            Excellent
                                            <div className="fs-12 font-weight-normal" style={{ fontSize: 13 }}>
                                                Xuất sắc
                                            </div>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3" />
                                <div className="col-md-9">
                                    <div className="report-group-1 d-block float-left p-3" />
                                    <div className="report-group-2 d-block float-left p-3" />
                                    <div className="report-group-3 d-block float-left p-3" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div
                                        className="report-title-icon"
                                        style={{
                                            backgroundImage: `url(/images/report-icon-listening.png)`
                                        }}
                                    >
                                        <strong>Listening</strong>
                                        <span>Nghe</span>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="report-progress-bar py-1">
                                        <div className="report-bar report-bar-1" />
                                        <div className="report-bar report-bar-2" />
                                        <div className="report-bar report-bar-3" />
                                        <div className="report-bar report-bar-4" />
                                        <div className="report-bar report-bar-5" />
                                        <div className="report-bar report-bar-6" />
                                        <div className="report-bar report-bar-7" />
                                        <div
                                            className="report-bar-ball"
                                            style={{
                                                left: `${
                                                    this.state.report
                                                        ? (this.state.report.test_report.listening /
                                                              this.state.report.test_report.listening_total) *
                                                              100 >=
                                                          97
                                                            ? (this.state.report.test_report.listening /
                                                                  this.state.report.test_report.listening_total) *
                                                                  100 -
                                                              3
                                                            : (this.state.report.test_report.listening /
                                                                  this.state.report.test_report.listening_total) *
                                                              100
                                                        : -1
                                                }%`
                                            }}
                                        >
                                            {this.state.report &&
                                                (this.state.report.test_report.listening /
                                                    this.state.report.test_report.listening_total) *
                                                    100 ==
                                                    100 && (
                                                    <span className="good-job">
                                                        <img src="/images/good_job_star.png" alt="" /> Good job!!
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div
                                        className="report-title-icon"
                                        style={{
                                            backgroundImage: `url(/images/report-icon-reading.png)`
                                        }}
                                    >
                                        <strong>Reading & Writing</strong>
                                        <span>Đọc & Viết</span>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="report-progress-bar my-1">
                                        <div className="report-bar report-bar-1" />
                                        <div className="report-bar report-bar-2" />
                                        <div className="report-bar report-bar-3" />
                                        <div className="report-bar report-bar-4" />
                                        <div className="report-bar report-bar-5" />
                                        <div className="report-bar report-bar-6" />
                                        <div className="report-bar report-bar-7" />
                                        <div
                                            className="report-bar-ball"
                                            style={{
                                                left: `${
                                                    this.state.report
                                                        ? (this.state.report.test_report.reading /
                                                              this.state.report.test_report.reading_total) *
                                                              100 >=
                                                          97
                                                            ? (this.state.report.test_report.reading /
                                                                  this.state.report.test_report.reading_total) *
                                                                  100 -
                                                              3
                                                            : (this.state.report.test_report.reading /
                                                                  this.state.report.test_report.reading_total) *
                                                              100
                                                        : -1
                                                }%`
                                            }}
                                        >
                                            {this.state.report &&
                                                (this.state.report.test_report.reading /
                                                    this.state.report.test_report.reading_total) *
                                                    100 ==
                                                    100 && (
                                                    <span className="good-job">
                                                        <img src="/images/good_job_star.png" alt="" /> Good job!!
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="col-md-2">
                                    <div
                                        className="report-title-icon"
                                        style={{
                                            backgroundImage: `url(/images/report-icon-grammar.png)`
                                        }}
                                    >
                                        <strong>Grammar</strong>
                                        <span>Ngữ Pháp</span>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="report-progress-bar my-1">
                                        <div className="report-bar report-bar-1" />
                                        <div className="report-bar report-bar-2" />
                                        <div className="report-bar report-bar-3" />
                                        <div className="report-bar report-bar-4" />
                                        <div className="report-bar report-bar-5" />
                                        <div className="report-bar report-bar-6" />
                                        <div className="report-bar report-bar-7" />
                                        <div
                                            className="report-bar-ball"
                                            style={{
                                                left: `${
                                                    this.state.report
                                                        ? (this.state.report.test_report.grammar /
                                                              this.state.report.test_report.grammar_total) *
                                                              100 >=
                                                          97
                                                            ? (this.state.report.test_report.grammar /
                                                                  this.state.report.test_report.grammar_total) *
                                                                  100 -
                                                              3
                                                            : (this.state.report.test_report.grammar /
                                                                  this.state.report.test_report.grammar_total) *
                                                              100
                                                        : -1
                                                }%`
                                            }}
                                        >
                                            {this.state.report &&
                                                (this.state.report.test_report.grammar /
                                                    this.state.report.test_report.grammar_total) *
                                                    100 ==
                                                    100 && (
                                                    <span className="good-job">
                                                        <img src="/images/good_job_star.png" alt="" /> Good job!!
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {this.state.feedback && this.state.feedback.comment && (
                                <div className="row">
                                    <div className="col-md-3">
                                        <div
                                            className="report-title-icon"
                                            style={{
                                                backgroundImage: `url(/images/report-icon-speaking.png)`
                                            }}
                                        >
                                            <strong>Speaking</strong>
                                            <span>Nói</span>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="report-progress-bar my-1">
                                            <div className="report-bar report-bar-1" />
                                            <div className="report-bar report-bar-2" />
                                            <div className="report-bar report-bar-3" />
                                            <div className="report-bar report-bar-4" />
                                            <div className="report-bar report-bar-5" />
                                            <div className="report-bar report-bar-6" />
                                            <div className="report-bar report-bar-7" />
                                            <div
                                                className="report-bar-ball"
                                                style={{
                                                    left: `${
                                                        this.state.feedback
                                                            ? (this.state.feedback.knowledge_assessment[0].value / 5) *
                                                                  100 >=
                                                              97
                                                                ? (this.state.feedback.knowledge_assessment[0].value /
                                                                      5) *
                                                                      100 -
                                                                  3
                                                                : (this.state.feedback.knowledge_assessment[0].value /
                                                                      5) *
                                                                  100
                                                            : -1
                                                    }%`
                                                }}
                                            >
                                                {this.state.report &&
                                                    (this.state.report.test_report.speaking /
                                                        this.state.report.test_report.speaking_total) *
                                                        100 ==
                                                        100 && (
                                                        <span className="good-job">
                                                            <img src="/images/good_job_star.png" alt="" /> Good job!!
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {this.state.feedback && this.state.feedback.comment && (
                            <div>
                                <div className="report-mini-boxes">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div
                                                className="report-mini-card"
                                                style={{
                                                    backgroundImage: `url(/images/report-dyno-2.png)`
                                                }}
                                            >
                                                <div className="report-mini-card-title">
                                                    <span className="font-weight-bold">Confidence </span>
                                                    <span>Tự tin</span>
                                                </div>
                                                <div className="report-mini-card-content">
                                                    {this._getText(
                                                        this.state.feedback
                                                            ? this.state.feedback.performance.expression
                                                            : 1,
                                                        'eng'
                                                    )}
                                                    <div>
                                                        {this._getText(
                                                            this.state.feedback
                                                                ? this.state.feedback.performance.expression
                                                                : 1
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div
                                                className="report-mini-card"
                                                style={{
                                                    backgroundImage: `url(/images/report-dyno-3.png)`
                                                }}
                                            >
                                                <div className="report-mini-card-title">
                                                    <span className="font-weight-bold">Participation </span>
                                                    <span>Tham gia</span>
                                                </div>
                                                <div className="report-mini-card-content">
                                                    {this._getText(
                                                        this.state.feedback
                                                            ? this.state.feedback.performance.interation
                                                            : 1,
                                                        'eng'
                                                    )}
                                                    <div>
                                                        {this._getText(
                                                            this.state.feedback
                                                                ? this.state.feedback.performance.interation
                                                                : 1
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div
                                                className="report-mini-card"
                                                style={{
                                                    backgroundImage: `url(/images/report-dyno-1.png)`
                                                }}
                                            >
                                                <div className="report-mini-card-title">
                                                    <span className="font-weight-bold">Behavior </span>
                                                    <span>Ứng xử</span>
                                                </div>
                                                <div className="report-mini-card-content">
                                                    {this._getText(
                                                        this.state.feedback
                                                            ? this.state.feedback.performance.reaction
                                                            : 1,
                                                        'eng'
                                                    )}
                                                    <div>
                                                        {this._getText(
                                                            this.state.feedback
                                                                ? this.state.feedback.performance.reaction
                                                                : 1
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="report-teacher-feedback mt-5">
                                    <div
                                        className="report-teacher-feedback-title"
                                        style={{
                                            backgroundImage: `url(/images/report-icon-report.png)`
                                        }}
                                    >
                                        Nhận xét của giáo viên
                                    </div>
                                    <div className="report-teacher-feedback-content">
                                        <Media>
                                            <Media left>
                                                <Media
                                                    src={
                                                        this.state.inforFeedback &&
                                                        this.state.inforFeedback.teacherpicture
                                                            ? this.state.inforFeedback.teacherpicture
                                                            : '/images/avatar_teacher.png'
                                                    }
                                                    style={{ width: 80, height: 80 }}
                                                    className="rounded-circle avatar"
                                                    alt=""
                                                />
                                            </Media>
                                            <Media body>
                                                <Media heading>
                                                    {this.state.inforFeedback && this.state.inforFeedback.teachername
                                                        ? this.state.inforFeedback.teachername
                                                        : 'Teacher'}
                                                    <span> Teacher</span>
                                                    <a href="#" className="tran-btn">
                                                        <img
                                                            src="/images/tran.png"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                if (this.state.feedback.comment) {
                                                                    return this._translatorText(
                                                                        this.state.feedback.comment
                                                                    );
                                                                }
                                                            }}
                                                            alt=""
                                                        />
                                                    </a>
                                                </Media>
                                                {this.state.feedback && this.state.feedback.comment
                                                    ? this.state.isTranslator
                                                        ? this.state.translatedComment
                                                        : this.state.feedback.comment
                                                    : null}
                                            </Media>
                                        </Media>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {this.state.testResults && this.state.testResults.level_name && (
                        <div>
                            <div
                                className="report-card-big-title"
                                style={{
                                    backgroundImage: `url(/images/report-bg-title.png)`
                                }}
                            >
                                {/* - Bé được đề xuất để bắt đầu học từ - */}
                                <h2>
                                    {this.state.testResults ? this.state.testResults.level_name : 'Level 1'} -{' '}
                                    {this.state.testResults ? this.state.testResults.course_name : 'trial'}
                                </h2>
                            </div>

                            <div
                                className="report-card-connect"
                                style={{
                                    backgroundImage: `url(/images/report-bg-connect.png)`
                                }}
                            />

                            <div
                                className="report-card mt-0"
                                style={{
                                    backgroundImage: `url(/images/report-bg-block.png)`
                                }}
                            >
                                <div
                                    className="report-card-title"
                                    style={{
                                        backgroundImage: `url(/images/report-bg-button.png)`
                                    }}
                                >
                                    <strong>TOPKIDS Placement Descriptions</strong>
                                    Cấp bậc của TOPKID
                                </div>
                                <div
                                    className={`report-card-content report-card-content-${
                                        this.state.testResults && this.state.testResults.level_name
                                            ? this.state.testResults.level_name.toLowerCase().replace(' ', '-')
                                            : ''
                                    }`}
                                >
                                    <div className="report-current-level">
                                        <div className="font-weight-normal">
                                            {userInfo.kid_name ? userInfo.kid_name : ''} is here
                                        </div>
                                        <div className="">{userInfo.kid_name ? userInfo.kid_name : ''} ở đây</div>
                                    </div>

                                    <div className="row no-gutters">
                                        <div className="col-md-2 report-level-1-wrap d-flex align-items-start flex-column">
                                            <div className="mb-auto w-100 report-level-title report-level-title-1 d-flex align-items-center justify-content-center">
                                                English <br /> Foundation
                                            </div>

                                            <div className="report-level-content-wrap">
                                                <div className="report-level-content report-level-content-1">
                                                    <div className="row no-gutters d-flex align-items-end">
                                                        <div className="col-md-6">
                                                            <div className="report-level report-level-1">Level 1</div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="report-level report-level-2">Level 2</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start flex-column report-level-body report-level-body-1">
                                                    <div className="mb-auto px-2">
                                                        Có ý thức và hứng thú học ngôn ngữ, nghe hiểu các hiệu lệnh của
                                                        giáo viên, từ nhận biết chữ cái đến phát âm được chữ cái, đến
                                                        đánh vần từ đơn giản. Nhớ và hiểu các từ và cụm từ này để giao
                                                        tiếp tự tin ở mức độ khởi đầu.
                                                    </div>
                                                    <div className="w-100 report-level-footer">Nhận thức</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 report-level-2-wrap d-flex align-items-start flex-column">
                                            <div className="mb-auto w-100 report-level-title report-level-title-2 d-flex align-items-center justify-content-center">
                                                Intermediate English Proficiency
                                            </div>

                                            <div className="report-level-content report-level-content-2">
                                                <div className="row no-gutters d-flex align-items-end">
                                                    <div className="col-md-6" style={{ borderRight: '1px solid #fff' }}>
                                                        <div className="row no-gutters d-flex align-items-end">
                                                            <div className="col-md-6">
                                                                <div className="report-level report-level-3">
                                                                    Level 3
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="report-level report-level-4">
                                                                    Level 4
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-start flex-column report-level-body report-level-body-2">
                                                            <div className="mb-auto px-2">
                                                                Khả năng hiểu rõ các từ vựng và dùng được nhiều loại câu
                                                                cơ bản. Thông qua việc vận dụng kiến thức đã học để hiểu
                                                                và khám phá kiến thức mới qua việc chủ động đặt câu hỏi
                                                                và cùng thảo luận với giáo viên.
                                                            </div>
                                                            <div className="w-100 report-level-footer">Hiểu rõ</div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="report-level report-level-5">Level 5</div>
                                                        <div className="d-flex align-items-start flex-column report-level-body report-level-body-3">
                                                            <div className="mb-auto px-2">
                                                                Nắm vững dạng ngữ pháp thường gặp, phát triển năng lực
                                                                tự đọc. Từ đó có thể liên hệ nội dung học với cuộc sống
                                                                của chính mình, và có thể dùng nhiều câu hoàn chỉnh để
                                                                trả lời các câu học, thảo luận và tự rút ra kết luận về
                                                                các vấn đề mở.
                                                            </div>
                                                            <div className="w-100 report-level-footer">Áp dụng</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 report-level-3-wrap d-flex align-items-start flex-column">
                                            <div className="mb-auto w-100 report-level-title report-level-title-3 d-flex align-items-center justify-content-center">
                                                Intermediate English Proficiency
                                            </div>

                                            <div className="report-level-content report-level-content-3">
                                                <div className="row no-gutters d-flex align-items-end">
                                                    <div className="col-md-4" style={{ borderRight: '1px solid #fff' }}>
                                                        <div className="report-level report-level-6">Level 6</div>
                                                        <div className="d-flex align-items-start flex-column report-level-body report-level-body-4">
                                                            <div className="mb-auto px-2">
                                                                Biết ứng dụng, phân tích, so sánh và tổ chức từ ngữ để
                                                                biểu đạt quan điểm của bản thân một cách có logic. Ngoài
                                                                ra, hiểu rõ về cấu trúc ngữ pháp, quy tắc chính tả,
                                                                chuẩn bị bước vào giai đoạn viết nâng cao hơn.
                                                            </div>
                                                            <div className="w-100 report-level-footer">Phân tích</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4" style={{ borderRight: '1px solid #fff' }}>
                                                        <div className="report-level report-level-7">Level 7</div>
                                                        <div className="d-flex align-items-start flex-column report-level-body report-level-body-5">
                                                            <div className="mb-auto px-2">
                                                                Khả năng kết hợp nhuần nhuyễn, hiệu quả giữa nội dung
                                                                kiến thức và các kỹ năng ngôn ngữ, kỹ năng công dân toàn
                                                                cầu thế kỷ 21 để giao tiếp, thuyết trình các kiến thức
                                                                tự đúc rút, biểu đạt ý kiến cá nhân một cách tự nhiên.
                                                            </div>
                                                            <div className="w-100 report-level-footer">Kết hợp</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="report-level report-level-8">Level 8</div>
                                                        <div className="d-flex align-items-start flex-column report-level-body report-level-body-6">
                                                            <div className="mb-auto px-2">
                                                                Chủ động bày tỏ bằng tiếng Anh các ý kiến sáng tạo trên
                                                                cơ sở các kiến thức, trải nghiệm, tư duy logic và các kỹ
                                                                năng toàn diện được trang bị. Các sản phẩm viết, giao
                                                                tiếp, thuyết trình ngang bằng học sinh các nước nói
                                                                tiếng Anh.
                                                            </div>
                                                            <div className="w-100 report-level-footer">Sáng tạo</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="report-card-connect"
                                style={{
                                    backgroundImage: `url(/images/report-bg-connect.png)`
                                }}
                            />

                            <div
                                className="report-card mt-0"
                                style={{
                                    backgroundImage: `url(/images/report-bg-block.png)`
                                }}
                            >
                                <div
                                    className="report-card-title"
                                    style={{
                                        backgroundImage: `url(/images/report-bg-button.png)`
                                    }}
                                >
                                    <strong>Learning Objective</strong>
                                    Mục tiêu học tập
                                </div>
                                <div className="report-card-content">
                                    <div className="report-teacher-feedback-content learning-objective">
                                        {this.state.learningObject.length > 0
                                            ? this.state.learningObject.map((item, index) => (
                                                  <Media key={index}>
                                                      <Media left>
                                                          <div className="number">{index + 1}</div>
                                                      </Media>
                                                      <Media body>
                                                          <Media heading>{item.contentVi}</Media>
                                                          <div className="mb-4">
                                                              <p>{item.contentEn}</p>
                                                          </div>
                                                      </Media>
                                                  </Media>
                                              ))
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

TestResults.propTypes = {
    userInfo: PropTypes.object,
    userState: PropTypes.any
};

const mapStateToProps = state => {
    return {
        userInfo: userSelector(state),
        userState: state.auth.userState
    };
};

export default connect(mapStateToProps)(TestResults);

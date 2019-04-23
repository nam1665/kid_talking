import React from 'react';
import PropTypes from 'prop-types';
import { SurveyOne, SurveyTwo, SurveyThree, SurveyFive } from './SurveyTypes';
import Request from 'src/helpers/Request';
import Route from 'src/helpers/Route';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SurveyLayout extends React.Component {
    state = {
        totalStep: 3,
        currentQ: 0,
        step: 1,
        questions: [],
        answersData: {}
    };

    async UNSAFE_componentWillMount() {
        try {
            const data = await Request.get('', {
                wsfunction: 'local_get_survey_questions'
            });

            this.setState({
                totalStep: data.result.length + this.state.totalStep,
                questions: data.result
            });
        } catch (e) {
            // console.error(e);
        }
    }

    _next() {
        let { step, currentQ } = this.state;
        const totalStep = this.state.totalStep;

        step = step + 1;

        if (step > totalStep) {
            step = totalStep;
        }

        if (step > 2) {
            this.nextButton.classList.add('d-none');
        }

        if (step >= 4 && step <= this.state.totalStep - 1) {
            currentQ++;
        }

        this.setState({
            step,
            currentQ: currentQ
        });
    }

    _renderSurvey() {
        const { step, currentQ, totalStep, questions } = this.state;
        if (step == 1) {
            return <SurveyOne />;
        } else if (step == 2) {
            return <SurveyTwo />;
        } else if (step >= 3 && step <= totalStep - 1) {
            return (
                <SurveyThree
                    key={step}
                    data={questions[currentQ]}
                    onChange={(e, value) => {
                        const { answersData } = this.state;

                        answersData[value.questionid] = value;

                        this.nextButton.classList.remove('d-none');

                        this.setState({
                            answersData
                        });
                    }}
                />
            );
        }

        return (
            <SurveyFive
                onNo={() => {
                    const confirm = window.confirm(
                        'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                    );
                    if (confirm) this.props.history.push(Route.home);
                }}
                onYes={() => {
                    this.props.onSurveyDone(this.state.answersData);
                }}
            />
        );
    }
    render() {
        return (
            <div className="survey-wrap d-flex justify-content-between align-items-center">
                {/* <div /> */}
                {this._renderSurvey()}
                <div className="pagination d-flex justify-content-end">
                    <button
                        ref={e => (this.nextButton = e)}
                        className="btn-3d btn-white btn-rounded next"
                        onClick={this._next.bind(this)}
                    >
                        <span>Tiếp theo</span>
                        <svg
                            style={{ height: '28px' }}
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="angle-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 512"
                            className="svg-inline--fa fa-angle-right fa-w-8"
                        >
                            <path
                                fill="currentColor"
                                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                                className=""
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}

SurveyLayout.propTypes = {
    history: PropTypes.any,
    onSurveyDone: PropTypes.func
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(withRouter(SurveyLayout));

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Route from 'src/helpers/Route';
import Storage from 'src/helpers/Storage';
import Request from 'src/helpers/Request';
import { connect } from 'react-redux';
import { userSelector } from 'src/modules/account/redux/selectors';
import { logout } from 'src/modules/account/redux/actions/account';
import moment from 'moment';

import result from '../../../homework/pages/result';



class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            serverHistory: []
        };
    }


    _renderStar(star) {

        return [1, 2, 3, 4, 5].map(score => {
            if (score <= star) {
                return (
                    <span key={score}>
                        <img src="/images/star.png" alt="" />
                    </span>
                );
            }
            return (
                <span key={score}>
                    <img src="/images/11.png" alt="" />
                </span>
            );
        });
    }

    _renderTestItem() {
        const { userState } = this.props;
        return (
            <div className="lesson exam">
                <div className="lesson-inner">
                    <div className="title">Kiểm tra Tiếng Anh</div>

                    <div className="content">
                        <img src="/images/bobi.png" alt="" />

                        <div className="button-wrap">
                            <Link to={Route.test} className="btn-3d btn-violet btn-rounded-20 fz-18 w-100 p-2 ">
                                {userState > 1 ? 'Kết quả kiểm tra' : 'Bắt đầu kiểm tra'}
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        );
    }


    _renderButton() {

        const { trialCourse } = this.props;

        if (trialCourse.is_completed) {
            return (
                <Link
                    className="btn-3d btn-violet btn-rounded-20 fz-26 w-100 p-2"
                    to={Route.getHomework(trialCourse.unitid, trialCourse.lessonid)}
                >
                    Bài tập về nhà
                </Link>
            );
        }

        if (trialCourse.isJoin == 1) {
            return (
                <button
                    className={`btn-3d btn-violet btn-rounded-20 fz-26 w-100 p-2`}
                    onClick={async () => {
                        try {
                            const vcrx = await Request.get('', {
                                wsfunction: 'mod_vcrx_join_room',
                                linkSlide: trialCourse.linkslide,
                                userId: Storage.get('kidUserId'),
                                roomId: trialCourse.roomid,
                                role: 'student',
                                lessonName: trialCourse.levelname + '-' + trialCourse.lessonname,
                                moodleToken: Storage.get('kidAccessToken')
                            });

                            if (vcrx.result.roomlink) window.location.href = vcrx.result.roomlink;
                        } catch (e) {
                            alert(e.message);
                        }
                    }}
                >
                    Vào lớp
                </button>
            );
        }

        if (trialCourse.link_video_record) {
            return (
                <a
                    className={`btn-3d btn-violet btn-rounded-20 fz-26 w-100 p-2`}
                    href={trialCourse.link_video_record}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Xem lại lớp
                </a>
            );
        }

        if (trialCourse.link_video_warmup) {
            return (
                <a
                    className={`btn-3d btn-violet btn-rounded-20 fz-26 w-100 p-2`}
                    href={trialCourse.link_video_warmup}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Xem trước
                </a>
            );
        }

        return (
            <button className={`btn-3d btn-rounded-20 fz-26 w-100 p-2 btn-grey`} rel="noopener noreferrer">
                Vào Lớp
            </button>
        );
    }

    _renderTrialItem() {
        if (this.props.userState < 2 || !this.props.trialCourse) return null;

        const { trialCourse } = this.props;

        return (
            <div className="lesson unit">
                <div className="lesson-inner">
                    <div className="title">
                        {trialCourse.levelname} - {trialCourse.lessonname}
                    </div>

                    <div className="content d-flex align-items-start flex-column">
                        <div className="time w-100 my-2">
                            <span className="fz-18 pr-2 font-weight-bold">
                                {moment.unix(trialCourse.starttime).format('ddd HH:mm')}
                            </span>
                            <span className="pl-2">{moment.unix(trialCourse.starttime).format('YYYY-MM-DD')}</span>
                        </div>

                        <div className="thumbnail w-100 mb-3">
                            <img src="/images/pre_bg_new.png" alt="" />
                        </div>

                        <div className="teacher-name w-100 mb-2">{trialCourse.teachername}</div>

                        <div className="star w-100 mb-4">{this._renderStar(trialCourse.review)}</div>

                        <div className="button-wrap w-100">{this._renderButton()}</div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="homepage-wrap">
                <div className="island" />
                <div className="balloom" />
                <div className="smallCloud" />

                <div className="header">
                    <div className="media">
                        <img
                            className="align-self-center mr-3"
                            width={60}
                            height={60}
                            src={this.props.userInfo.pictures ? this.props.userInfo.pictures : '/images/avatar_kid.png'}
                            alt={this.props.userInfo.kid_name}
                        />
                        <div className="media-body">
                            <div className="title text-white">{this.props.userInfo.kid_name}</div>
                            <div className="level text-white">
                                {Storage.get('kidLevel', 'Level 1') + ' ' + Storage.get('kidUnit', 'Unit 1')}
                            </div>
                        </div>
                    </div>

                    <a
                        className="setting"
                        href="#"
                        onClick={e => {
                            e.preventDefault();

                            const confirm = window.confirm('Bạn có muốn thoát không?');

                            if (confirm) this.props.userSignout();
                        }}
                    >
                        <img src="/images/10.png" alt="" />
                    </a>
                </div>

                <div className="main-wrap">
                    {this._renderTestItem()}
                    {this._renderTrialItem()}
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    userInfo: PropTypes.object,
    userState: PropTypes.number,
    trialCourse: PropTypes.any,
    userSignout: PropTypes.func
};

const mapStateToProps = state => {
    return {
        userInfo: userSelector(state),
        userState: state.auth.userState,
        trialCourse: state.auth.trialCourse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userSignout: () => {
            dispatch(logout());
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

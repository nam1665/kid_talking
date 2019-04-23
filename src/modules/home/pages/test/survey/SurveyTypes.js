import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Route from 'src/helpers/Route';

class TypeOne extends React.PureComponent {
    render() {
        return (
            <div className="wrapper">
                <div className="top-buttons">
                    <button
                        className="btn btn-link btn-back"
                        onClick={() => {
                            const confirm = window.confirm(
                                'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                            );

                            if (confirm) this.props.history.push(Route.home);
                        }}
                    >
                        Back
                    </button>
                </div>

                <div className="survey-1">
                    <div className="content">
                        Trước khi làm bài kiểm tra, hãy đảm bảo thiết bị của bạn có thể phát âm thanh một cách bình
                        thường. Giờ bạn hãy mở loa của thiết bị hoặc mang tai nghe vào, sau đó ấn nút phát nhạc bên
                        dưới. Nếu thiết bị có thể phát âm thanh bình thường, làm ơn ấn nút &quot;Tiếp Theo&quot;
                    </div>
                    <audio src="/audio/audio.mp3" ref={e => (this.audioField = e)} />
                    <div className="btn-wrap">
                        <button
                            className="btn-3d btn-rounded-circle btn-pink"
                            onClick={() => {
                                this.audioField.play();
                            }}
                        >
                            <svg
                                style={{ height: '45px' }}
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="play"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="svg-inline--fa fa-play fa-w-14"
                            >
                                <path
                                    fill="currentColor"
                                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                    className=""
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

TypeOne.propTypes = {
    history: PropTypes.any
};

const TypeFive = props => {
    const { onNo, onYes } = props;
    return (
        <div className="wrapper">
            <div className="top-buttons">
                <button
                    className="btn btn-link btn-back"
                    onClick={() => {
                        const confirm = window.confirm(
                            'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                        );

                        if (confirm) props.history.push(Route.home);
                    }}
                >
                    Back
                </button>
            </div>
            <div className="survey-2">
                <div className="content">
                    <h2 className="title">Thoả thuận với phụ huynh</h2>
                    <div className="inner fz-26">
                        Tôi đồng ý rằng trong quá trình kiểm tra tôi sẽ không giúp đỡ hoặc làm hộ về mặt nội dung bài
                        kiểm tra ( nhưng tôi có thể giúp đỡ về mặt ký thuật ). Tôi hiểu rằng việc tôi giúp trẻ trả lời
                        câu hỏi để được kết quả cao hơn so với thực lực thật sẽ ảnh hưởng tiêu cực đến sự tự tin và năng
                        lực học Tiếng Anh của trẻ trong tương lai.
                    </div>
                </div>

                <div className="btn-wrap d-flex justify-content-between">
                    <button className="btn-3d btn-pink btn-rounded-20 fz-18 prev text-dark" onClick={onNo}>
                        <svg
                            style={{ height: '22px' }}
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="angle-left"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 512"
                            className="svg-inline--fa fa-angle-left fa-w-8 fa-2x"
                        >
                            <path
                                fill="currentColor"
                                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                                className=""
                            />
                        </svg>
                        <span>Tôi không đồng ý</span>
                    </button>

                    <button className="btn-3d btn-blue btn-rounded-20 fz-18 next text-dark" onClick={onYes}>
                        <span>Tôi đồng ý kiểm tra</span>
                        <svg
                            style={{ height: '22px' }}
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
        </div>
    );
};

TypeFive.propTypes = {
    history: PropTypes.any
};

TypeFive.propTypes = {
    onYes: PropTypes.func,
    onNo: PropTypes.func
};

const TypeTwo = props => {
    return (
        <div className="wrapper">
            <div className="top-buttons">
                <button
                    className="btn btn-link btn-back"
                    onClick={() => {
                        const confirm = window.confirm(
                            'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                        );

                        if (confirm) this.props.history.push(Route.home);
                    }}
                >
                    Back
                </button>
            </div>
            <div className="survey-3">
                <div className="content text-center">
                    Chào phụ huynh, sau đây quí vị sẽ thấy có một số câu hỏi liên quan đến kinh nghiệm học tiếng Anh của
                    trẻ, vui lòng đưa ra câu trả lời chính xác để chúng tôi có thể đánh giá đúng thực lực của trẻ.
                </div>
            </div>
        </div>
    );
};

const TypeSix = props => {
    return (
        <div className="wrapper">
            <div className="top-buttons">
                <button
                    className="btn btn-link btn-back"
                    onClick={() => {
                        const confirm = window.confirm(
                            'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                        );

                        if (confirm) this.props.history.push(Route.home);
                    }}
                >
                    Back
                </button>
            </div>
            <div className="survey-4">
                <div className="content">
                    <div className="text-center">
                        <h2 className="title">Hoàn Thành</h2>
                        <div>Bạn có thể ấn vào đây để xem kết quả bài kiểm tra</div>
                        <div className="btn-wrap mt-5">
                            <button className="btn-3d btn-blue btn-rounded-20 fz-26 text-dark">Báo cáo kiểm tra</button>
                        </div>
                    </div>

                    <div className="mt-5">
                        Sau khi tham gia học thử bạn có thể vào Ảnh trẻ, sau đó vào{' '}
                        <span className="font-weight-bold">&quot;Trình Độ Tiếng Anh&quot;</span> để xem kết quả chính
                        xác hơn
                    </div>
                </div>
            </div>
        </div>
    );
};

class TypeThree extends React.PureComponent {
    UNSAFE_componentWillMount() {
        setTimeout(() => {
            if (this.container) {
                if (this.container.offsetHeight >= 535) {
                    this.container.style.overflow = 'auto';
                } else {
                    this.container.style.overflow = 'visible';
                }
            }
        }, 10);
    }

    render() {
        const { data, onChange } = this.props;

        let useTwoColumn = true;

        const index = data.answers.findIndex(item => {
            return item.answer_name.length > 15;
        });

        if (index > -1) {
            useTwoColumn = false;
        }

        if (data.answers.length > 8) {
            useTwoColumn = false;
        }

        if (useTwoColumn) {
            const output = [];

            let i = 1;
            let y = 0;

            data.answers.forEach(item => {
                if (!output[y]) {
                    output.push([]);
                }

                output[y].push(item);
                if (i == 2) {
                    i = 1;
                    y++;
                } else {
                    i++;
                }
            });

            return (
                <div className="wrapper">
                    <div className="top-buttons">
                        <button
                            className="btn btn-link btn-back"
                            onClick={() => {
                                const confirm = window.confirm(
                                    'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                                );

                                if (confirm) this.props.history.push(Route.home);
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <div className="survey-6">
                        <div className="content">
                            <div className="text-center" style={{ lineHeight: '1.5' }}>
                                {data.question_name}
                            </div>
                            <div className="pt-4">
                                {output.map((items, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            {items.map(item => {
                                                return (
                                                    <div className="col-6 px-5" key={item.answer_id}>
                                                        <button
                                                            className={`btn btn-block btn-s1 mb-4 answer-button`}
                                                            onClick={e => {
                                                                const buttons = document.querySelectorAll(
                                                                    '.answer-button'
                                                                );

                                                                if (buttons) {
                                                                    buttons.forEach(button => {
                                                                        button.classList.remove('active');
                                                                    });
                                                                }

                                                                e.target.classList.add('active');

                                                                if (onChange)
                                                                    onChange(e, {
                                                                        questionid: data.question_id,
                                                                        answerid: item.answer_id
                                                                    });
                                                            }}
                                                        >
                                                            {item.answer_name}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="wrapper">
                <div className="top-buttons">
                    <button
                        className="btn btn-link btn-back"
                        onClick={() => {
                            const confirm = window.confirm(
                                'Bạn có chắc là bạn muốn thoát khỏi bài kiểm tra? Các kết quả và dữ liệu bạn vừa điền sẽ không được lưu lại.'
                            );

                            if (confirm) this.props.history.push(Route.home);
                        }}
                    >
                        Back
                    </button>
                </div>
                <div className="survey-5">
                    <div className="content">
                        <div className="text-center">{data.question_name}</div>
                        <div
                            ref={e => (this.container = e)}
                            className="px-5 pt-4"
                            style={{
                                maxHeight: '535px'
                                // overflow: 'auto' // bỏ khi không cần scroll
                            }}
                        >
                            {data.answers.map((item, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`btn btn-block btn-s1 mb-4 answer-button`}
                                        onClick={e => {
                                            const buttons = document.querySelectorAll('.answer-button');

                                            if (buttons) {
                                                buttons.forEach(button => {
                                                    button.classList.remove('active');
                                                });
                                            }

                                            e.target.classList.add('active');
                                            if (onChange)
                                                onChange(e, {
                                                    questionid: data.question_id,
                                                    answerid: item.answer_id
                                                });
                                        }}
                                    >
                                        {item.answer_name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TypeThree.propTypes = {
    history: PropTypes.any,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

const SurveyOne = withRouter(TypeOne);
const SurveyTwo = withRouter(TypeTwo);
const SurveyThree = withRouter(TypeThree);
const SurveyFive = withRouter(TypeFive);
const SurveySix = withRouter(TypeSix);

export { SurveyOne, SurveyTwo, SurveyThree, SurveyFive, SurveySix };

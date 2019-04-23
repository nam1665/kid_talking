import React from 'react';
import PropTypes from 'prop-types';
import HomeworkLayout from './HomeworkLayout';

class TrueFalse extends React.Component {
    state = {
        checked: null
    };

    render() {
        const { onNext, data, q_picture, q_text, q_title, ...other } = this.props;

        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                onNext={() => {
                    const { checked } = this.state;
                    if (onNext && checked)
                        onNext({
                            answer: [checked.pos],
                            correct: Number(checked.fraction) === 1,
                            fraction: Number(checked.fraction)
                        });
                }}
                showNextButton={this.state.checked !== null}
            >
                <div
                    className={`${
                        q_text ? 'typeForteen' : 'typeOne'
                    } d-flex justify-content-center flex-column align-items-center`}
                >
                    {q_picture && (
                        <div className="imgVoiceWrap">
                            <img src={q_picture} alt="" />
                        </div>
                    )}
                    {q_text && (
                        <div className="contentWrap">
                            <div className="content">{q_text}</div>
                        </div>
                    )}
                    <div className="d-flex justify-content-between mt-5">
                        {data.map((item, index) => {
                            const checked = this.state.checked && item.pos == this.state.checked.pos;
                            if (item.text.toLowerCase() == 'true') {
                                return (
                                    <button
                                        className={`btn-3d btn-green btn-rounded fz-26 mr-4 ${checked && 'active'}`}
                                        key={index}
                                        onClick={() => {
                                            this.setState({
                                                checked: item
                                            });
                                        }}
                                    >
                                        <span>True</span>
                                    </button>
                                );
                            }

                            return (
                                <button
                                    className={`btn-3d btn-red btn-rounded fz-26 float-right ${checked && 'active'}`}
                                    key={index}
                                    onClick={() => {
                                        this.setState({
                                            checked: item
                                        });
                                    }}
                                >
                                    <span>False</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

TrueFalse.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_picture: PropTypes.string,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default TrueFalse;

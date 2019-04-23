import React from 'react';
import PropTypes from 'prop-types';
import HomeworkLayout from './HomeworkLayout';

class PickText extends React.Component {
    state = {
        checked: null
    };

    render() {
        const { onNext, data, q_title, ...other } = this.props;

        data.sort((a, b) => {
            return a.pos < b.pos;
        });

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
                showNextButton={this.state.checked}
            >
                <div className="typeTwo container">
                    {data.map((item, index) => {
                        const checked = this.state.checked && item.pos == this.state.checked.pos;
                        return (
                            <button
                                className="btn-3d btn-orange btn-rounded fz-26 px-4 py-2 w-100"
                                style={{
                                    marginTop: '2rem'
                                }}
                                onClick={() => {
                                    this.setState({
                                        checked: item
                                    });
                                }}
                                key={index}
                            >
                                <div className="d-flex justify-content-between">
                                    <div>{item.text}</div>
                                    <span className="active-wrap">
                                        <span className="active-checked">
                                            {checked && (
                                                <img
                                                    style={{ width: '70px' }}
                                                    src="/images/homework_check.png"
                                                    alt=""
                                                />
                                            )}
                                        </span>
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </HomeworkLayout>
        );
    }
}

PickText.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_title: PropTypes.string,
    q_text: PropTypes.string
};

export default PickText;

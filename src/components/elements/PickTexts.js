import React from 'react';
import PropTypes from 'prop-types';
import HomeworkLayout from './HomeworkLayout';
import { Fade } from 'reactstrap';

class PickTexts extends React.Component {
    state = {
        checked: null,
        group: -1
    };

    UNSAFE_componentWillMount() {
        const group = this.props.q_text.replace(/^.*\[{2}(.+?)]{2}.*$/, "$1");
        this.setState({ group: Number(group) })

    }

    _renderQuestion() {
        const question = this.props.q_text.split(/\[{2}(.+?)]{2}/);
        const answer = this.state.checked ? this.state.checked.text : '';
        return (
            <div className="title text-center">
                {question[0]} <strong className="textWrap">{answer}</strong> {question[2]}
            </div>
        );
    }
    render() {
        const { onNext, data, q_title, ...other } = this.props;
        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                onNext={() => {
                    const { checked, group } = this.state;

                    let correct = false;

                    if (checked.group == group) {
                        correct = true
                    }

                    console.log({
                        answer: [checked.group],
                        correct: correct,
                        fraction: correct ? Number(this.props.data.q_mark) : 0
                    })


                    if (onNext && checked)
                        onNext({
                            answer: [checked.group],
                            correct: correct,
                            fraction: correct ? Number(this.props.data.q_mark) : 0
                        });
                }}
                showNextButton={this.state.checked !== null}
            >
                <div className="typeThirdteen container">
                    <div className="contentWrap mb-5">{this._renderQuestion()}</div>
                    <div className="row text-center">
                        {data.map(item => (
                            <div className="col-6 mb-5" key={item}>
                                <button
                                    key={item}
                                    onClick={() =>
                                        this.setState({
                                            checked: item
                                        })
                                    }
                                    className="btn-3d btn-orange btn-rounded fz-26 "
                                >
                                    <div className="inner d-flex justify-content-between">
                                        {item.text}
                                        <span className="active-wrap">
                                            <span className="active-checked">
                                                {this.state.checked == item && (
                                                    <Fade>
                                                        <img
                                                            src="/images/homework_check.png"
                                                            alt=""
                                                            style={{ width: '85px' }}
                                                        />
                                                    </Fade>
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

PickTexts.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default PickTexts;

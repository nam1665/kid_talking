import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import _ from 'lodash';

class Mover_3 extends React.Component {
    state = {
        checked: false,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: ''
    };

    onsubmit() {
        const { value1, value2, value3, value4, value5, value6 } = this.state;

        if (value1 != '' && value2 != '' && value3 != '' && value4 != '' && value5 != '' && value6 != '') {
            return this.setState({
                checked: true
            });
        }
        this.setState({
            checked: false
        });
    }

    render() {
        console.log(this.state.checked);
        const { onNext, data, q_title, ...other } = this.props;
        const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        data.sort((a, b) => {
            return a.pos < b.pos;
        });

        return (
            <DefaultLayout
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
                <div className="typeSeventeen w-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="mr-5">
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/10.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value1}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value1: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/11.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value2}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value2: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/12.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value3}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value3: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/13.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value4}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value4: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/14.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value5}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value5: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mr-5">
                                        <div>
                                            <img src="/images/homework/test-3/15.png" />
                                        </div>
                                        <div>village</div>
                                        <div className="answer">
                                            <input
                                                value={this.state.value6}
                                                type="text"
                                                placeholder=" "
                                                maxLength={1}
                                                onChange={e => {
                                                    const index = _.findIndex(list, o => {
                                                        return o == e.target.value;
                                                    });
                                                    this.setState(
                                                        {
                                                            value6: index > -1 ? list[index] : ''
                                                        },
                                                        () => this.onsubmit()
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="image-wrap">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/2.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/3.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/4.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/5.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/6.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/7.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/8.png" className="d-block my-3" />
                                        </div>
                                        <div className="col-md-6">
                                            <img src="/images/homework/test-3/9.png" className="d-block my-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

Mover_3.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array
};

export default Mover_3;

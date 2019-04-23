import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HomeworkLayout from './HomeworkLayout';

class PickPicture extends React.Component {
    state = {
        checked: null
    };

    render() {
        const { data, q_title, onNext, ...other } = this.props;

        data.sort((a, b) => {
            return a.pos < b.pos;
        });

        // total =

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
                showNextButton={this.state.checked != null}
            >
                <div className="typeNine container">
                    <div className="row">
                        {data.map((item, index) => {
                            const checked = this.state.checked && item.pos == this.state.checked.pos;
                            const classes = [
                                'mt-4',
                                _.includes([3, 6], data.length)
                                    ? 'text-center'
                                    : index % 2
                                    ? 'text-left'
                                    : 'text-right',
                                _.includes([3, 6], data.length) ? 'col-4' : 'col-6'
                            ];

                            return (
                                <div className={classes.join(' ')} key={index}>
                                    <div
                                        className={`imgWrap`}
                                        onClick={() => {
                                            this.setState({
                                                checked: item
                                            });
                                        }}
                                    >
                                        <div className="img-overlay" style={{ backgroundImage: `url(${item.url})` }} />
                                        <img className="img-fluid" src="https://via.placeholder.com/600x400" alt="" />
                                        <div className={`checkWrap ${checked ? 'active' : ''}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

PickPicture.propTypes = {
    data: PropTypes.array,
    q_title: PropTypes.string,
    onNext: PropTypes.func
};

export default PickPicture;

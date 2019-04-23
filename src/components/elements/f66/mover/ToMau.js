import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../DefaultLayout';
import { Fade } from 'reactstrap';
import index from 'src/modules/account/pages/index/index';

class ToMau extends React.Component {
    state = {
        checked: false,
        active: null,
        listImage: [
            {
                color: null
            }
        ],
        color: null,
        listPen: [
            {
                color: 'orange',
                value: 1
            },
            {
                color: 'blue',
                value: 2
            },
            {
                color: 'yellow',
                value: 3
            },
            // {
            //     color: 'purple',
            //     value: 4
            // },
            // {
            //     color: 'green',
            //     value: 5
            // },
            {
                color: 'red',
                value: 4
            }
        ]
    };

    render() {
        const { onNext, data, q_text, q_title, ...other } = this.props;
        const { listPen } = this.state;
        return (
            <DefaultLayout
                {...other}
                title={'Read text and tick the best answer'}
                // q_audio = {}
                // onNext={() => {
                //     const { checked } = this.state;
                //     if (onNext && checked)
                //         onNext({
                //             answer: [checked.pos],
                //             correct: Number(checked.fraction) === 1,
                //             fraction: Number(checked.fraction)
                //         });
                // }}
                showNextButton={this.state.checked}
            >
                <div className="typeNineteen w-100">
                    <div className="container">
                        <div className="paper">
                            <div
                                className={`element element-a element-a-${this.state.filled}`}
                                onClick={() =>
                                    this.setState({
                                        filled: this.state.active
                                    })
                                }
                            />
                            <div className="element element-b element-b-0" />
                            <div className="element element-c element-c-3" />
                            <div className="element element-d element-d-4" />
                            <img src="/images/homework/test-5/picture.png" />
                        </div>
                        <div className="pencil-box">
                            {listPen.map((item, index) => (
                                <div
                                    key={index.toString()}
                                    className={`pencil pencil-${item.color} ${
                                        this.state.active == item.value ? 'active' : null
                                    }`}
                                    onClick={() => {
                                        this.setState({
                                            active: item.value
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

ToMau.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default ToMau;

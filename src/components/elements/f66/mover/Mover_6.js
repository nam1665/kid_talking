import React from 'react';
import DefaultLayout from '../../DefaultLayout';

class MoverSix extends React.Component {
    state = {
        data: [
            {
                question: 'You can hold and pick up thinks with these parts of your body',
                answer: ''
            },
            {
                question: 'Name of farm',
                answer: ''
            },
            {
                question: 'Name of farm',
                answer: ''
            },
            {
                question: 'Name of farm',
                answer: ''
            },
            {
                question: 'Name of farm',
                answer: ''
            }
        ]
    };

    render() {
        return (
            <DefaultLayout>
                <div className="typeTwenty w-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-6/5.png" className="w-100 h-auto mb-3" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-6/6.png" className="w-100 h-auto mb-3" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-6/7.png" className="w-100 h-auto mb-3" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-6/8.png" className="w-100 h-auto mb-3" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-6/9.png" className="w-100 h-auto mb-3" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <img
                                            src="/images/homework/test-6/10.png"
                                            className="w-100 h-auto mb-3"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <img
                                            src="/images/homework/test-6/11.png"
                                            className="w-100 h-auto mb-3"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <img
                                            src="/images/homework/test-6/12.png"
                                            className="w-100 h-auto mb-3"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="ml-5">
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <div
                                                className="question d-flex justify-content-between mt-3 align-items-center"
                                                key={index}
                                            >
                                                <span>
                                                    {index + 1}. {item.question}
                                                </span>
                                                <div className="answer ml-5">
                                                    <input
                                                        type="text"
                                                        placeholder=" "
                                                        value={item.answer}
                                                        onChange={e => {
                                                            const { data } = this.state;

                                                            data[index].answer = e.target.value;

                                                            this.setState({
                                                                data
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

export default MoverSix;

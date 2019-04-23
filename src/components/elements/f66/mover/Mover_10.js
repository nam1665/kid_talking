import React from 'react';
import DefaultLayout from '../../DefaultLayout';

export default class MoverTen extends React.Component {
    state = {
        data: [
            {
                q: 'Lorem ipsum dolor sit amet, consectetur [[]] adipiscing elit.',
                a: ''
            },
            {
                q: 'Lorem ipsum dolor sit amet, consectetur [[]] adipiscing elit.',
                a: ''
            },
            {
                q: 'Lorem ipsum dolor sit amet, consectetur [[]] adipiscing elit.',
                a: ''
            },
            {
                q: 'Lorem ipsum dolor sit amet, consectetur [[]] adipiscing elit.',
                a: ''
            }
        ]
    };

    renderWord(item, index) {
        return item.q.split(' ').map((word, key) => {
            if (word.indexOf('[[]]') > -1) {
                return (
                    <span className="answer">
                        <input
                            type="text"
                            placeholder=" "
                            value={item.a}
                            onChange={e => {
                                const { data } = this.state;

                                data[index].a = e.target.value;

                                this.setState({
                                    data
                                });
                            }}
                        />
                    </span>
                );
            }

            return ' ' + word + ' ';
        });
    }

    render() {
        return (
            <DefaultLayout>
                <div className="typeTwentyFour w-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src="/images/homework/test-10/1.png"
                                    className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                                    alt=""
                                />
                                <div className="answer-wrapper">
                                    <p>
                                        Quisque nec cursus urna. Etiam mattis at nisi ac rutrum. Aenean at risus ligula.
                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Phasellus sit amet sapien et massa ullamcorper tempor. Aliquam ac
                                        augue lobortis, pharetra metus ut, facilisis eros.
                                    </p>
                                    {[0, 1].map((item, index) => {
                                        return (
                                            <p key={index}>
                                                <strong>
                                                    {index + 1}. {this.renderWord(this.state.data[item], item)}
                                                </strong>
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <img
                                    src="/images/homework/test-10/2.png"
                                    className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                                    alt=""
                                />
                                <div className="answer-wrapper">
                                    <p>
                                        Quisque nec cursus urna. Etiam mattis at nisi ac rutrum. Aenean at risus ligula.
                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Phasellus sit amet sapien et massa ullamcorper tempor. Aliquam ac
                                        augue lobortis, pharetra metus ut, facilisis eros.
                                    </p>
                                    {[2, 3].map((item, index) => {
                                        return (
                                            <p key={index}>
                                                <strong>
                                                    {index + 1}. {this.renderWord(this.state.data[item], item)}
                                                </strong>
                                            </p>
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

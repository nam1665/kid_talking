import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DefaultLayout from '../../DefaultLayout';
import BaseLayer from './Base.js'

class StarterFour extends BaseLayer {
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
                color: 'dark-green',
                value: 1
            },
            {
                color: 'brown',
                value: 2
            },
            {
                color: 'red',
                value: 3
            },
            {
                color: 'pink',
                value: 4
            },
            {
                color: 'yellow',
                value: 5
            }
        ],
        currentId: 0,
        o1: null,
        o2: null,
        o3: null,
        o4: null,
        o5: null,
        o6: null,
        currentSound: 0,
        totalSound: 0
    };

    UNSAFE_componentWillMount() {
        console.log(6);
        this.status_wait = true;
        this.wait(300000);
        const {
            attachments: { sound },
            q_text
        } = this.props;

        console.log(sound);

        if (sound && sound.length > 0) {
            this.setState({
                totalSound: 5
            });
        }
    }

    nextQuestion(){
        this.setDefault();
        const { o1, o2, o3, o4, o5, o6, listPen, totalSound } = this.state;
        let correct = true;
        let point = 5;
        const answers = [];

        // con chim trên chậu hoa
        if (o2 == 2) {
            //TODO
            answers.push(`4:brown:true`);
        } else {
            correct = false;
            point = point - 1;
            if (o2 > 0) {
                answers.push(`4:${listPen[o2 - 1].color}:false`);
            } else {
                answers.push(`4:no-color:false`);
            }
        }

        // con chim sau cô bé
        if (o3 == 3) {
            answers.push(`3:red:true`);
        } else {
            correct = false;
            point = point - 1;
            if (o3 > 0) {
                answers.push(`3:${listPen[o3 - 1].color}:false`);
            } else {
                answers.push(`3:no-color:false`);
            }
        }

        // con chim đang bay
        if (o4 == 1) {
            answers.push(`5:green:true`);
        } else {
            correct = false;
            point = point - 1;
            if (o4 > 0) {
                answers.push(`5:${listPen[o4 - 1].color}:false`);
            } else {
                answers.push(`5:no-color:false`);
            }
        }

        // con chim trên đầu con chó
        if (o5 == 4) {
            answers.push(`2:pink:true`);
        } else {
            correct = false;
            point = point - 1;
            if (o5 > 0) {
                answers.push(`2:${listPen[o5 - 1].color}:false`);
            } else {
                answers.push(`2:no-color:false`);
            }
        }

        // con chim dưới cái cây
        if (o6 == 5) {
            answers.push(`1:yellow:true`);
        } else {
            correct = false;
            point = point - 1;
            if (o6 > 0) {
                answers.push(`1:${listPen[o6 - 1].color}:false`);
            } else {
                answers.push(`1:no-color:false`);
            }
        }

        const data = {
            answer: answers,
            correct: correct,
            fraction: point
        };

        this.props.onNext(data);
    }
    check_color(){
        const { o1, o2, o3, o4, o5, o6, listPen, totalSound } = this.state;
        const dataAnswer = [o2, o3, o4, o5, o6];
        console.log(dataAnswer.filter(o => o == null).length);
        if (dataAnswer.filter(o => o == null).length == 1){
            this.send(this.trigger_confirm);
        }
    }

    render() {
        const {
            onNext,
            attachments: { sound },
            q_picture,
            q_audio,
            ...other
        } = this.props;
        const { o1, o2, o3, o4, o5, o6, listPen, totalSound } = this.state;
        let { currentSound } = this.state;

        const dataAnswer = [o2, o3, o4, o5, o6];

        return (
            <DefaultLayout
                {...other}
                title={'Listen and colour'}
                q_audio={sound && sound[currentSound] ? sound[currentSound] : null}
                showModel={dataAnswer.filter(o => o != null).length < totalSound - 1}
                alertMessage={`Còn ${
                    dataAnswer.filter(o => o == null).length
                } chim chưa tô màu xong, bạn chắc chắn muốn chuyển tới phần sau?`}
                onSoundEnded={() => {
                    currentSound = currentSound + 1;

                    if (currentSound < totalSound) {
                        this.nextAudioTimeout = setTimeout(
                            () => {
                                this.setState(
                                    {
                                        currentSound: currentSound
                                    },
                                    () => {
                                        if (this.nextAudioTimeout) clearTimeout(this.nextAudioTimeout);
                                    }
                                );
                            },
                            currentSound === 1 ? 2000 : 10000
                        );
                    }
                }}
                handleAudioButton={() => {
                    this.setState({
                        currentSound: 0
                    });
                }}
                onNext={() => {
                    this.nextQuestion();
                }}
            >
                <div className="typeTwentySix w-100">
                    <div className="container">
                        <div className="paper">
                            <div
                                className="element element-1 element-1-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;
                                    e.target.classList.remove(`element-1-0`);
                                    e.target.classList.remove('element-1-1');
                                    e.target.classList.remove('element-1-2');
                                    e.target.classList.remove('element-1-3');
                                    e.target.classList.remove('element-1-4');
                                    e.target.classList.remove('element-1-5');

                                    e.target.classList.add(`element-1-${this.state.currentId}`);

                                    this.setState({
                                        o1: this.state.currentId
                                    });
                                    // moi lan click vao 1 con chim
                                    // dataAnswer.filter(o => o != null).length < totalSound - 1
                                }}
                            />
                            <div
                                className="element element-2 element-2-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;
                                    e.target.classList.remove('element-2-0');
                                    e.target.classList.remove('element-2-1');
                                    e.target.classList.remove('element-2-2');
                                    e.target.classList.remove('element-2-3');
                                    e.target.classList.remove('element-2-4');
                                    e.target.classList.remove('element-2-5');

                                    e.target.classList.add(`element-2-${this.state.currentId}`);

                                    this.setState({
                                        o2: this.state.currentId
                                    });
                                    // viet
                                    this.check_color();
                                }}
                            />
                            <div
                                className="element element-3 element-3-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;
                                    e.target.classList.remove('element-3-0');

                                    e.target.classList.remove('element-3-1');
                                    e.target.classList.remove('element-3-2');
                                    e.target.classList.remove('element-3-3');
                                    e.target.classList.remove('element-3-4');
                                    e.target.classList.remove('element-3-5');

                                    e.target.classList.add(`element-3-${this.state.currentId}`);

                                    this.setState({
                                        o3: this.state.currentId
                                    });
                                    // viet
                                    this.check_color();
                                }}
                            />
                            <div
                                className="element element-4 element-4-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;
                                    e.target.classList.remove('element-4-0');
                                    e.target.classList.remove('element-4-1');
                                    e.target.classList.remove('element-4-2');
                                    e.target.classList.remove('element-4-3');
                                    e.target.classList.remove('element-4-4');
                                    e.target.classList.remove('element-4-5');

                                    e.target.classList.add(`element-4-${this.state.currentId}`);

                                    this.setState({
                                        o4: this.state.currentId
                                    });
                                    this.check_color();
                                    // viet
                                }}
                            />
                            <div
                                className="element element-5 element-5-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;

                                    e.target.classList.remove('element-5-0');
                                    e.target.classList.remove('element-5-1');
                                    e.target.classList.remove('element-5-2');
                                    e.target.classList.remove('element-5-3');
                                    e.target.classList.remove('element-5-4');
                                    e.target.classList.remove('element-5-5');

                                    e.target.classList.add(`element-5-${this.state.currentId}`);

                                    this.setState({
                                        o5: this.state.currentId
                                    });
                                    // viet
                                    this.check_color();
                                }}
                            />
                            <div
                                className="element element-6 element-6-0"
                                onClick={e => {
                                    if (!this.state.currentId) return;
                                    e.target.classList.remove('element-6-0');
                                    e.target.classList.remove('element-6-1');
                                    e.target.classList.remove('element-6-2');
                                    e.target.classList.remove('element-6-3');
                                    e.target.classList.remove('element-6-4');
                                    e.target.classList.remove('element-6-5');

                                    e.target.classList.add(`element-6-${this.state.currentId}`);

                                    this.setState({
                                        o6: this.state.currentId
                                    });
                                    // viet
                                    this.check_color();
                                }}
                            />
                            <img src={q_picture} alt="" className="noselect" draggable={false} />
                        </div>
                        <div className="pencil-box">
                            {this.state.listPen.map((item, index) => {
                                return (
                                    <div
                                        className={`pencil pencil-${item.color}`}
                                        key={index}
                                        onClick={e => {
                                            const elems = document.getElementsByClassName('pencil');

                                            if (elems.length > 0) {
                                                _.forEach(elems, item => {
                                                    item.classList.remove('active');
                                                });
                                            }

                                            e.target.classList.add('active');

                                            this.setState({
                                                currentId: item.value
                                            });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

StarterFour.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_text: PropTypes.string,
    q_title: PropTypes.string
};

export default StarterFour;

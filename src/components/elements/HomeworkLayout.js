import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Route from 'src/helpers/Route';
import { Progress } from 'reactstrap';

import annyang from 'src/helpers/Annyang';


class HomeworkLayout extends React.PureComponent {
    componentDidMount() {

        annyang.addCommands(this.reset, this.change, this.undo)
        annyang.addCallback(this.engineCallback, this.resultCallback)
        annyang.start()
        console.log('annyang start')

        this.setState({
            voiceStatus: annyang.isSupported() ? 'Supported' : 'Unsupported'
        })

        if (this.props.q_audio) {
            this.audio = new Audio(this.props.q_audio);

            this.audio.addEventListener('ended', this.handleAudioEnd.bind(this));

            if (typeof this.audio.play === 'function') this.audio.play();
        } else {
            this.timeout = setTimeout(this.handleAudioEnd.bind(this), 3000);
        }

    }

    componentWillUnmount() {

        annyang.abort()

        //
        // if (this.audio) {
        //     this.audio.pause();
        // }
        //
        // if (this.timeout) {
        //     clearTimeout(this.timeout);
        // }


    }

    engineCallback = (status) => {
        this.setState({
            voiceStatus: status
        })
    }

    resultCallback = (voiceInput) => {
        this.setState({
            voiceInput: voiceInput
        })
        voiceInput.some(phrase => {
            console.log(voiceInput[0])
        })
    }

    handleAudioEnd() {
        // this.instruction.classList.add('hidden');
    }

    handleAudioButton(e) {
        e.preventDefault();

        // this.instruction.classList.remove('hidden');

        if (this.audio) {
            this.audio.play();
        }
    }

    handleBackButton(e) {
        e.preventDefault();

        const confirm = window.confirm('Bạn có muốn thoát khỏi bài kiểm tra?');

        if (confirm) this.props.history.push(Route.home);
    }

    render() {
        const { current, totalQuestions, onNext, showNextButton, children, title } = this.props;
        const progress = (current / totalQuestions) * 100;
        return (
            <div className="homework-wrap justify-content-between flex-column">
                {/* Start Header */}
                <div className="siteHeader d-flex justify-content-end">
                    <a className="btnBack" href="#" onClick={this.handleBackButton.bind(this)}>
                        <img src="/images/homework/back.png" alt="" />
                    </a>

                    <div className="instruction" ref={e => (this.instruction = e)}>
                        {/* class de an: hidden */}
                        <div className="inner d-flex align-items-center">
                            <div>{title}</div>
                        </div>
                    </div>

                    <a className="btnInstruction" href="#" onClick={this.handleAudioButton.bind(this)}>
                        <img src="/images/homework/btn-3d btn-rounded-circle btn-pink.png" alt="" />
                    </a>
                </div>
                {/* End Header */}

                {/* Start Content */}
                <div className="d-flex w-100 h-100 justify-content-center align-items-center">{children}</div>
                {/* Start Content */}

                {/* Start Footer */}
                <div className="siteFooter fixed-bottom">
                    <div
                        className="progressWrap"
                        style={{
                            width: '100%'
                        }}
                    >
                        <div className="number">
                            {current}/{totalQuestions}
                        </div>
                        <Progress value={progress} />
                    </div>
                    <div
                        className={`btnNextWrap pl-4 d-flex justify-content-center align-items-center ${
                            showNextButton ? '' : 'hidden'
                        }`}
                    >
                        {/* class de an: hidden */}
                        <span className="text mr-3 mt-2">Next</span>
                        <button
                            className="btn-3d btn-rounded-circle btn-pink"
                            onClick={() => {
                                if (onNext) onNext();
                            }}
                        >
                            <svg style={{ height: '45px' }} viewBox="0 0 256 512">
                                <path
                                    fill="currentColor"
                                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* End Footer */}
            </div>
        );
    }
}

HomeworkLayout.propTypes = {
    onNext: PropTypes.func,
    data: PropTypes.array,
    q_audio: PropTypes.any,
    current: PropTypes.number,
    totalQuestions: PropTypes.number,
    history: PropTypes.any,
    children: PropTypes.any,
    showNextButton: PropTypes.bool,
    title: PropTypes.string
};

export default withRouter(HomeworkLayout);

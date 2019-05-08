import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Route from 'src/helpers/Route';
import { Progress } from 'reactstrap';
import Alert from '../Alert';

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.startTime = Date.now();
    this.time = 0;
  }

  componentDidMount() {
    if (this.props.q_audio) {
      this.playAudio(this.props.q_audio);
    }

    this.interval = setInterval(() => {
      this.time = Date.now() - this.startTime;
    }, 1000);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    // if (nextProps.q_audio !== )
    const { q_audio: oldAudio } = this.props;
    const { q_audio: newAudio } = nextProps;

    console.log('oldAudio', oldAudio);
    console.log('newAudio', newAudio);

    if (oldAudio !== newAudio) {
      this.playAudio(newAudio);
    }
  }

  componentWillUnmount() {
    if (this.audio) {
      this.audio.pause();
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.timeout2) {
      clearTimeout(this.timeout2);
    }

    if (this.interval) {
      clearInterval(this.time);
    }

    if (this.soundBtn) this.soundBtn.classList.remove('d-none');

    this.removeEvent();
  }

  playAudio = url => {
    if (!url) return;

    if (this.audio && this.audio.isPlaying) return;

    this.removeEvent();

    this.audio = new Audio(url);

    this.addEvent();

    if (typeof this.audio.play == 'function') this.audio.play();

    this.audio.isPlaying = true;
  };

  addEvent = () => {
    if (!this.audio) return;

    this.audio.addEventListener('ended', this.handleAudioEnd.bind(this));
  };

  removeEvent = () => {
    if (!this.audio) return;

    this.audio.removeEventListener('ended', this.handleAudioEnd.bind(this));
  };

  handleAudioEnd() {
    // this.instruction.classList.add('hidden');
    const { onSoundEnded } = this.props;

    this.audio.isPlaying = false;

    if (onSoundEnded) onSoundEnded();
  }

  handleAudioButton(e) {
    e.preventDefault();

    // this.instruction.classList.remove('hidden');

    const { handleAudioButton } = this.props;

    if (handleAudioButton && typeof handleAudioButton == 'function') {
      return handleAudioButton();
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.play();
    }

    this.timeout2 = setTimeout(() => {
      this.soundBtn.classList.add('d-none');
    }, 2000);
  }

  handleBackButton(e) {
    e.preventDefault();

    const confirm = window.confirm('Bạn có muốn thoát khỏi bài kiểm tra?');

    if (confirm) this.props.history.push(Route.home);
  }

  render() {
    const {
      current,
      totalQuestions,
      onNext,
      children,
      title,
      instructorClass,
      progressClass,
      extendCom: Component,
      background,
      wrapperClasses,
      alertMessage,
      showModel
    } = this.props;
    const progress = (current / totalQuestions) * 100;

    let style = {};

    if (background) {
      style = {
        backgroundImage: `url(${background})`
      };
    }

    return (
      <div className={`homework-wrap justify-content-between flex-column ${wrapperClasses}`}>
        {Component ? <Component /> : null}
        {/* Start Header */}
        <div className="siteHeader d-flex justify-content-end">
          {/* Tạm thời sẽ ẩn nút back */}
          {/* <a className="btnBack" href="#" onClick={this.handleBackButton.bind(this)}>
                        <img src="/images/homework/back.png" alt="" />
                    </a> */}

          <div className={`instruction ${instructorClass}`} ref={e => (this.instruction = e)}>
            <div className="inner d-flex align-items-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: title
                }}
              />
            </div>
          </div>

          {this.props.q_audio && (
            <a
              className="btnInstruction"
              href="#"
              onClick={this.handleAudioButton.bind(this)}
              ref={e => (this.soundBtn = e)}
            >
              <img src="/images/homework/voiceBlue.png" alt="" />
            </a>
          )}
        </div>
        {/* End Header */}

        {/* Start Content */}
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">{children}</div>
        {/* Start Content */}

        {/* Start Footer */}
        <div className="siteFooter fixed-bottom">
          <div className={`progressWrap ${progressClass}`}>
            <div className="number">
              {current}/{totalQuestions}
            </div>
            <Progress value={progress} />
          </div>
          <div className={`btnNextWrap pl-4 d-flex justify-content-center align-items-center`}>
            <span className="text mr-3 mt-2">Next</span>
            <button
              className="btn-3d btn-rounded-circle btn-pink"
              onClick={() => {
                if (showModel) this.alertForm.toggle();
                else if (onNext) onNext(this.time);
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
        <Alert
          ref={e => (this.alertForm = e)}
          message={alertMessage ? alertMessage : 'Bạn chắc chắn muốn chuyển tới câu sau?'}
          onOk={() => {
            if (onNext) onNext(this.time);
          }}
        />
        {background ? (
          <img
            src={background}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100vh'
            }}
          />
        ) : null}
      </div>
    );
  }
}

Layout.propTypes = {
  onNext: PropTypes.func,
  data: PropTypes.array,
  q_audio: PropTypes.any,
  current: PropTypes.number,
  totalQuestions: PropTypes.number,
  history: PropTypes.any,
  children: PropTypes.any,
  showNextButton: PropTypes.bool,
  title: PropTypes.string,
  instructorClass: PropTypes.string,
  progressClass: PropTypes.string,
  extendCom: PropTypes.any,
  background: PropTypes.string,
  wrapperClasses: PropTypes.string,
  alertMessage: PropTypes.string,
  showModel: PropTypes.bool
};

export default withRouter(Layout);

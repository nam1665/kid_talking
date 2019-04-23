import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import DefaultLayout from '../../../DefaultLayout';
import style from './style.module.css';

class Example extends React.PureComponent {
    componentDidMount() {
        if (this.videoRef && this.props.q_video) {
            if (Hls.isSupported() && this.props.q_video.indexOf('m3u8') > -1) {
                if (this.videoRef.canPlayType('application/vnd.apple.mpegurl')) {
                    this.videoRef.src = this.props.q_video;
                    this.videoRef.play();
                }

                const hls = new Hls();
                hls.loadSource(this.props.q_video);
                hls.attachMedia(this.videoRef);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    this.videoRef.play();
                });
            } else {
                this.videoRef.src = this.props.q_video;
                this.videoRef.play();
            }
        }
    }

    componentWillUnmount() {
        if (this.videoRef) {
            this.videoRef.pause();
        }
    }

    render() {
        const { onNext, q_video, ...rest } = this.props;
        return (
            <DefaultLayout
                onNext={time => {
                    onNext({
                        answer: ['example'],
                        correct: false,
                        fraction: 0
                    });
                }}
                instructorClass="d-none"
                progressClass="d-none"
                extendCom={() => {
                    return (
                        <React.Fragment>
                            <div className={style.wrap} />
                            <p className={style.text}>{this.props.q_title.replace(/\[\[.*?\]\]/g, '').trim()}</p>
                        </React.Fragment>
                    );
                }}
                {...rest}
            >
                <video id="video" className={style.video} ref={e => (this.videoRef = e)} controls autoPlay />
            </DefaultLayout>
        );
    }
}

Example.propTypes = {
    q_video: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default Example;

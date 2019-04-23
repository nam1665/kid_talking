import React from 'react';
import style from './style.module.css';

class Timer extends React.PureComponent {
    constructor() {
        super();

        this.startTime = Date.now();
        this.state = {
            time: 0
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    tick() {
        this.setState({
            time: Date.now() - this.startTime
        });
    }

    converTime(mSec) {
        const seconds = Math.round(mSec / 1000);
        let minutes = Math.floor(seconds / 60);
        let sec = seconds % 60;

        minutes = minutes < 10 ? `0${minutes}` : minutes;

        sec = sec < 10 ? `0${sec}` : sec;

        return `${minutes}:${sec}`;
    }

    getTotalTime() {
        return {
            time: this.state.time,
            timeConverted: this.converTime(this.state.time)
        };
    }

    render() {
        return (
            <span className={style.timmer}>
                <span className={style.title}>Classtime</span>
                {this.converTime(this.state.time)}
            </span>
        );
    }
}

export default Timer;

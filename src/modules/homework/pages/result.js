import React from 'react';
import { withRouter } from 'react-router';




class Results extends React.PureComponent {



    componentDidMount() {

    }


    _renderText() {
        if (this.props.totalFalse > 0) {
            return `Bé có ${this.props.totalFalse} câu trả lời sai, cần xem lại`;
        }

        return 'Bé đã hoàn thành bài tập về nhà.';
    }


    render() {
        return (
            <div className="finishHomeWorkWrap py-5 d-flex justify-content-center align-items-center flex-column">
                <div className="fz-50 text-white font-weight-bold mb-4">Kidtopi Speaking Test</div>

                <div className="text-center">
                    <img style={{ width: '80%' }} src="/images/goodjob.png" alt="" />
                </div>

                <div
                    className="fz-40 text-white font-weight-bold mt-4 text-center px-5"
                    style={{
                        width: '50%'
                    }}
                >
                    <div className="row">
                        <div className="col">
                            <img src="/images/homework/true_icon.png" alt="" className="mr-3" />
                            {this.props.totalTrue}
                        </div>
                        <div className="col">
                            <img src="/images/homework/fail_icon.png" alt="" className="mr-3" />
                            {this.props.totalFalse}
                        </div>
                        <div className="col">
                            <img src="/images/homework/time_icon.png" alt="" className="mr-3" />
                            {this.props.totalTime}
                        </div>
                    </div>
                </div>

                <div className="fz-40 text-white font-weight-bold mt-4 text-center px-5">{this._renderText()}</div>

                <div className="text-center mt-4">

                    <button
                        className="btn-3d btn-white btn-rounded fz-26"
                        style={{ textTransform: 'inherit' }}
                        onClick={() => {
                            if (this.props.onClick) this.props.onClick();
                        }}
                    >
                        Xem lại bài tập
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Results);

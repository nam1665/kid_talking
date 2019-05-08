import React from 'react';
import { withRouter } from 'react-router';
import Route from 'src/helpers/Route';
import TestResult from './TestResult';

class Results extends React.PureComponent {
  state = {
    showTest: false
  };

  render() {
    if (this.state.showTest) {
      return <TestResult />;
    }

    return (
      <div className="finishHomeWorkWrap py-5 d-flex justify-content-center align-items-center flex-column">
        <div className="fz-50 text-white font-weight-bold mb-4">Kidtopi Computer Test</div>

        <div className="text-center">
          <img onContextMenu={e => e.preventDefault()} style={{ width: '80%' }} src="/images/goodjob.png" alt="" />
        </div>

        <div className="fz-40 text-white font-weight-bold mt-4 text-center px-5">
          Cảm ơn bé đã hoàn thành bài kiểm tra,
          <br /> chúng tôi sẽ liên hệ lại để thông báo kết quả trong thời gian sớm nhất
        </div>

        {/* <div className="text-center mt-4">
                    <button
                        className="btn-3d btn-white btn-rounded fz-26"
                        style={{ textTransform: 'inherit' }}
                        onClick={() => {
                            // this.setState({
                            //     showTest: !this.state.showTest
                            // });
                            this.props.history.push(Route.home);
                        }}
                    >
                        Báo cáo kiểm tra
                    </button>
                </div> */}
      </div>
    );
  }
}

export default withRouter(Results);

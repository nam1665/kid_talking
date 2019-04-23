import React from 'react';

class TrueFalseItem extends React.PureComponent {
    render() {
        const { text, onChange, showText } = this.props;

        return (
            <div className="box d-flex justify-content-between">
                <div className="content">{text}</div>
                <div className="chooseWrap d-flex justify-content-between align-items-center">
                    {showText && (
                        <React.Fragment>
                            <span className="text left">True</span>
                            <span className="text right">False</span>
                        </React.Fragment>
                    )}
                    <span
                        className={`true`}
                        ref={e => (this.trueItem = e)}
                        onClick={e => {
                            this.falseItem.classList.remove('active');
                            e.target.classList.add('active');

                            if (onChange) onChange(true, e);
                        }}
                    >
                        <span className="inner" />
                    </span>
                    <span
                        className={`false `}
                        ref={e => (this.falseItem = e)}
                        onClick={e => {
                            this.trueItem.classList.remove('active');
                            e.target.classList.add('active');

                            if (onChange) onChange(false, e);
                        }}
                    >
                        <span className="inner" />
                    </span>
                </div>
            </div>
        );
    }
}

export default TrueFalseItem;

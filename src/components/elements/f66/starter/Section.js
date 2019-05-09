import React from 'react';
import DefaultLayout from '../../DefaultLayout';

class Section extends React.PureComponent {
    render() {
        const { q_picture, onNext, ...rest } = this.props;
        return (
            <DefaultLayout
                instructorClass="d-none"
                progressClass="d-none"
                background={q_picture}
                {...rest}
                onNext={time => {
                    onNext({
                        answer: ['section'],
                        correct: false,
                        fraction: 0
                    });
                }}
            />
        );
    }
}

export default Section;

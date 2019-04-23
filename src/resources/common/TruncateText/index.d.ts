import { SFC } from 'react';

interface TruncateTextProps {
	text?: string;
	length?: number;
	separator?: string;
	omission?: string;
}

const defaultProps: TruncateTextProps = {
	text: '',
	length: 50,
	separator: '',
	omission: '...'
};

declare const TruncateComponent: SFC<TruncateTextProps>;

TruncateComponent.defaultProps = defaultProps;

export default TruncateComponent;

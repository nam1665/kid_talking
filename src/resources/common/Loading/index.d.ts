import { SFC } from 'react';

interface LoadingProps {
	loading?: boolean;
	color?: string;
	type?: 'slack' | 'wave' | 'bounce' | 'overlay' | 'cube';
}

declare const BaseLoading: SFC<LoadingProps>;

const defaultProps: LoadingProps = {
	loading: true,
	type: 'slack'
};

BaseLoading.defaultProps = defaultProps;

export default BaseLoading;

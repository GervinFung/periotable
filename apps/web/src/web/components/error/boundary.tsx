import type { NextRouter } from 'next/router';

import Head from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';

import Layout from '../layout';

type Props = Readonly<{
	router: NextRouter;
	children: React.ReactNode;
}>;

type State = Readonly<{
	closedAlert: boolean;
	error: Error | undefined;
}>;

class ErrorBoundary extends React.Component<Props, State> {
	static getDerivedStateFromError = (error: Error): State => {
		return {
			error,
			closedAlert: false,
		};
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			error: undefined,
			closedAlert: false,
		};
	}

	override shouldComponentUpdate(_: Props, nextState: State) {
		return nextState.error?.message !== this.state.error?.message;
	}

	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error({ error, errorInfo });
		// eslint-disable-next-line react/no-set-state
		this.setState({ error });
	}

	override render() {
		return !this.state.error ? (
			this.props.children
		) : (
			<Layout>
				<Head>
					<title>Error</title>
				</Head>
				{this.state.closedAlert ? null : (
					//something
					<div>error</div>
				)}
			</Layout>
		);
	}
}

export default withRouter(ErrorBoundary);

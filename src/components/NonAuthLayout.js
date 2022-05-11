import React, { Component, Suspense } from "react";

// loading
const loading = () => <div className="text-center">Loading...</div>

class NonAuthLayout extends Component {
	render() {
		const children = this.props.children || null;
		return (
			<Suspense fallback={loading()}>
				{children}
			</Suspense>
		);
	}
}

export default NonAuthLayout;
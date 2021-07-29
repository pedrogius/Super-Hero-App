import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const ErrorJumbotron = ({ statusCode, statusText, message }) => {
	return (
		<div className="jumbotron">
			<h1 className="display-4">
				{statusCode} Error - {statusText}
			</h1>
			<p className="lead">{message}</p>
			<LinkContainer to={'/'}>
				<Button variant="primary">Return to Home</Button>
			</LinkContainer>
		</div>
	);
};

ErrorJumbotron.defaultProps = {
	message: 'Something went wrong',
};

export default ErrorJumbotron;

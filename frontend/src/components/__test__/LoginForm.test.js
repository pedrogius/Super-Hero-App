import React from 'react';
import SignInForm from '../Form';
import { act } from 'react-dom/test-utils';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '../../providers/authProvider';

test('rendering and submitting form', async () => {
	const handleSubmit = jest.fn();
	const Wrapper = () => {
		return (
			<AuthProvider>
				<SignInForm onSubmit={handleSubmit} />
			</AuthProvider>
		);
	};
	const { getByTestId } = render(<Wrapper />);
	const emailEl = getByTestId('email');
	const passwordEl = getByTestId('password');
	const formEl = getByTestId('form');

	await act(async () => {
		fireEvent.change(emailEl, { target: { value: 'email@email.com' } });
	});
	await act(async () => {
		fireEvent.change(passwordEl, { target: { value: '12345' } });
	});

	fireEvent.submit(formEl);

	await waitFor(() => expect(emailEl).toHaveValue('email@email.com'));
	await waitFor(() => expect(passwordEl).toHaveValue('12345'));
	await waitFor(() => expect(handleSubmit).toBeCalled());
});

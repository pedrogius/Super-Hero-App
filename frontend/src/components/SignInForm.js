import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../providers/authProvider';
import { USER_LOGIN } from '../constants/constants';
import Loader from './Loader';
import { toast } from 'react-toastify';

const SignInSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),

	password: Yup.string()
		.required('Password is required')
		.min(5, 'Must be 5 characters or more'),
});

const SignInForm = () => {
	const { dispatch } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	const initialValues = {
		email: '',
		password: '',
	};

	const handleSubmit = async (values) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				'http://challenge-react.alkemy.org/',
				values
			);
			window.localStorage.setItem('access_token', data.token);
			toast.dark('Welcome Back!');
			setIsLoggedIn(true);
		} catch {
			setIsLoading(false);
			toast.error('Please check your credentials');
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			dispatch({ type: USER_LOGIN });
			history.push('/');
		}
	}, [history, isLoggedIn, dispatch]);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={SignInSchema}
				onSubmit={handleSubmit}
			>
				{(formik) => {
					const { errors, touched, isValid, dirty } = formik;
					return (
						<>
							{isLoading ? (
								<Loader message={'Logging In...'} />
							) : (
								<div className="container">
									<Form className="login-form" data-testid="form">
										<div className="form-row">
											<label htmlFor="email">Email</label>
											<Field
												type="email"
												name="email"
												id="email"
												data-testid="email"
												className={
													errors.email && touched.email
														? 'input-error formik-field'
														: 'formik-field'
												}
											/>
											<ErrorMessage
												name="email"
												component="span"
												className="error"
											/>
										</div>

										<div className="form-row">
											<label htmlFor="password">Password</label>
											<Field
												type="password"
												name="password"
												id="password"
												data-testid="password"
												className={
													errors.password && touched.password
														? 'input-error formik-field'
														: 'formik-field'
												}
											/>
											<ErrorMessage
												name="password"
												component="span"
												className="error"
											/>
										</div>
										<div className="text-center">
											<Button
												type="submit"
												data-testid="submit-btn"
												className={
													dirty && isValid ? 'mt-3' : 'disabled-btn mt-3'
												}
												disabled={!(dirty && isValid)}
											>
												Sign In
											</Button>
										</div>
									</Form>
								</div>
							)}
						</>
					);
				}}
			</Formik>
		</>
	);
};

export default SignInForm;

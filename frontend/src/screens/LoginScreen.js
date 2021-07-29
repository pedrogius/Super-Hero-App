import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import SignInForm from '../components/SignInForm';
import Meta from '../components/Helmet';
import { AuthContext } from '../providers/authProvider';
import { ToastContainer } from 'react-toastify';

const LoginScreen = ({ history }) => {
	const { store } = useContext(AuthContext);

	return (
		<div>
			{store.isLoggedIn && history.push('/')}
			<>
				<Meta title="SuperHero App | Login" />
				<h1 id="login-header">Login</h1>
				<Card id="login-card">
					<Card.Body>
						<SignInForm />
					</Card.Body>
				</Card>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</>
		</div>
	);
};

export default LoginScreen;

import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { USER_LOGOUT } from '../constants/constants';
import { AuthContext } from '../providers/authProvider';

const Header = () => {
	const { store, dispatch } = useContext(AuthContext);

	const logoutHandler = () => {
		dispatch({ type: USER_LOGOUT });
		window.localStorage.removeItem('access_token');
		toast.dark('See you soon!');
	};

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>My Team</Navbar.Brand>
					</LinkContainer>
					<Nav className="me-auto">
						<LinkContainer to="/search">
							<Nav.Link>Search Heroes</Nav.Link>
						</LinkContainer>
					</Nav>
					{store.isLoggedIn && (
						<Nav className="ms-auto">
							<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
						</Nav>
					)}
				</Container>
			</Navbar>
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
	);
};

export default Header;

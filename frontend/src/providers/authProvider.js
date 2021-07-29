import React, { useReducer } from 'react';
import { USER_LOGIN, USER_LOGOUT } from '../constants/constants';

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return { isLoggedIn: true };
		case USER_LOGOUT:
			return { isLoggedIn: false };
		default:
			return state;
	}
};

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
	const token = window.localStorage.getItem('access_token');

	const initialState = {
		isLoggedIn: token ? true : false,
	};

	const [store, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={{ store, dispatch }}>
			{props.children}
		</AuthContext.Provider>
	);
};

import React, { useReducer } from 'react';
import {
	ADD_BAD_HERO,
	ADD_GOOD_HERO,
	REMOVE_BAD_HERO,
	REMOVE_GOOD_HERO,
} from '../constants/constants';

const initialState = {
	goodHeroes: [],
	badHeroes: [],
};

const HeroReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_GOOD_HERO:
			return {
				goodHeroes: [...state.goodHeroes, action.payload],
				badHeroes: [...state.badHeroes],
			};
		case REMOVE_GOOD_HERO:
			return {
				goodHeroes: [
					...state.goodHeroes.filter((hero) => hero.id !== action.payload),
				],
				badHeroes: [...state.badHeroes],
			};
		case ADD_BAD_HERO:
			return {
				badHeroes: [...state.badHeroes, action.payload],
				goodHeroes: [...state.goodHeroes],
			};
		case REMOVE_BAD_HERO:
			return {
				badHeroes: [
					...state.badHeroes.filter((hero) => hero.id !== action.payload),
				],
				goodHeroes: [...state.goodHeroes],
			};
		default:
			return state;
	}
};

export const HeroContext = React.createContext();

export const HeroProvider = (props) => {
	const [store, dispatch] = useReducer(HeroReducer, initialState);

	return (
		<HeroContext.Provider value={{ store, dispatch }}>
			{props.children}
		</HeroContext.Provider>
	);
};

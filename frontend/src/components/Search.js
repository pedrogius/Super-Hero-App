import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Search = ({ getQuery, getAlignment }) => {
	const [text, setText] = useState('');
	/* eslint-disable no-unused-vars */
	const [alignment, setAlignment] = useState('any');
	/* eslint-enable no-unused-vars */

	const onChange = (q) => {
		setText(q);
		getQuery(q);
	};

	const changeAlignment = (a) => {
		setAlignment(a);
		getAlignment(a);
	};
	return (
		<Form className="mb-3 search-bar">
			<select onChange={(e) => changeAlignment(e.target.value)}>
				<option value="any">Any Alignment</option>
				<option value="good">Good Alignment</option>
				<option value="bad">Bad Alignment</option>
			</select>
			<Form.Control
				type="text"
				placeholder="Search Characters..."
				value={text}
				onChange={(e) => onChange(e.target.value)}
				autoFocus
			></Form.Control>
		</Form>
	);
};

export default Search;

import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="name" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'SuperHero App | Home',
	description: 'Build a superhero team',
	keywords: 'heroes, superheroes',
};

export default Meta;

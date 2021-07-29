import React from 'react';
import Loader from './Loader';
import FlipCard from './FlipCard';

const SearchResults = ({ items, isLoading, alignment }) => {
	const alignedHeroes = () => {
		switch (alignment) {
			case 'any': {
				return items;
			}
			case 'good': {
				return items.filter((i) => i.biography.alignment === 'good');
			}
			case 'bad': {
				return items.filter((i) => i.biography.alignment === 'bad');
			}
			default: {
				return items;
			}
		}
	};

	return isLoading ? (
		<Loader />
	) : (
		<section className="cards">
			{items &&
				alignedHeroes().map((item) => (
					<FlipCard key={item.id} hero={item}></FlipCard>
				))}
		</section>
	);
};

export default SearchResults;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import Meta from '../components/Helmet';
import { AuthContext } from '../providers/authProvider';
import { toast, ToastContainer } from 'react-toastify';

const fetchData = async (query, cb) => {
	const res = await axios(`/api/search/${query}`);
	cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
	fetchData(query, cb);
}, 500);

const SearchScreen = ({ history }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [alignment, setAlignment] = useState('any');

	const { store } = useContext(AuthContext);

	useEffect(() => {
		if (!store.isLoggedIn) {
			toast.dark('You must be logged in to view this page');
			history.push('/login');
		}
	}, [history, store]);

	useEffect(() => {
		let cancelled = false;
		const fetchItems = () => {
			setIsLoading(true);
			debouncedFetchData(query, (res) => {
				if (!cancelled) {
					if (res.data.results) {
						setItems(res.data.results);
					} else {
						setItems([]);
						toast.error(
							'Your search returned no results. Please try a different term'
						);
					}

					setIsLoading(false);
				}
			});
		};
		if (query.length > 0) {
			fetchItems();
		} else {
			setItems([]);
			setIsLoading(false);
		}
		return () => {
			cancelled = true;
		};
	}, [query]);

	return (
		<div>
			<Meta title="Search Heroes" />
			<Search
				getQuery={(q) => setQuery(q)}
				getAlignment={(a) => setAlignment(a)}
			/>
			<SearchResults
				isLoading={isLoading}
				items={items}
				alignment={alignment}
			/>
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
		</div>
	);
};

export default SearchScreen;

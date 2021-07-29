import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';
import HeroChart from '../components/HeroChart';
import Meta from '../components/Helmet';
import { AuthContext } from '../providers/authProvider';
import { HeroContext } from '../providers/heroProvider';
import {
	ADD_BAD_HERO,
	ADD_GOOD_HERO,
	REMOVE_BAD_HERO,
	REMOVE_GOOD_HERO,
} from '../constants/constants';
import ErrorJumbotron from '../components/ErrorJumbotron';

const HeroScreen = ({ match, history }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [heroData, setHeroData] = useState(null);
	const [chartData, setChartData] = useState({});
	const [apiError, setApiError] = useState({});

	const { store } = useContext(AuthContext);
	const { store: heroStore, dispatch: heroDispatch } = useContext(HeroContext);

	useEffect(() => {
		let cancelled = false;
		if (!store.isLoggedIn) {
			toast.dark('You must be logged in to view this page');
			history.push('/login');
		} else {
			const fetchHero = async () => {
				try {
					const { data } = await axios(`/api/${match.params.id}`);
					if (data.response === 'success') {
						if (!cancelled) {
							setHeroData(data);
							setChartData(
								Object.entries(data.powerstats).map((stat) => {
									return {
										name: stat[0].charAt(0).toUpperCase() + stat[0].slice(1),
										amt: parseInt(stat[1]),
										fullMark: 100,
									};
								})
							);
						}
						setIsLoading(false);
					} else if (data.response === 'error') {
						setIsLoading(false);
					}
				} catch (e) {
					setIsLoading(false);
					const details = { ...e };
					setApiError({
						statusCode: details.response.status,
						statusText: details.response.statusText,
						message: details.response.data.error,
					});
				}
			};
			fetchHero();
		}
		return () => {
			cancelled = true;
		};
	}, [history, store, match.params.id, setApiError]);

	const addHeroHandler = () => {
		if (
			heroData.biography.alignment === 'good' &&
			heroStore.goodHeroes.length < 3
		) {
			heroDispatch({ type: ADD_GOOD_HERO, payload: heroData });
			history.push('/');
		} else if (
			heroData.biography.alignment === 'bad' &&
			heroStore.badHeroes.length < 3
		) {
			heroDispatch({ type: ADD_BAD_HERO, payload: heroData });
			history.push('/');
		} else {
			alert('You can only add 3 heroes of this type');
		}
	};

	const removeHeroHandler = () => {
		if (heroData.biography.alignment === 'good') {
			heroDispatch({ type: REMOVE_GOOD_HERO, payload: heroData.id });
		} else {
			heroDispatch({ type: REMOVE_BAD_HERO, payload: heroData.id });
		}
	};

	const allHeroes = [...heroStore.goodHeroes, ...heroStore.badHeroes];

	return (
		<>
			{isLoading ? (
				<Loader />
			) : !_.isEmpty(apiError) ? (
				<ErrorJumbotron
					statusCode={apiError.statusCode}
					statusText={apiError.statusText}
					message={apiError.message}
				/>
			) : heroData ? (
				<>
					<Meta title={heroData.name} />
					<div className="hero-screen-container" data-testid="container">
						<div className="hero-screen-title">
							<h1>{heroData.name}</h1>
						</div>
						<div className="hero-screen-image">
							<Image src={heroData.image.url} rounded fluid />
							{allHeroes.find((x) => x.id === heroData.id) ? (
								<Button
									className="button-hero-screen"
									variant="danger"
									onClick={removeHeroHandler}
								>
									Remove from my team
								</Button>
							) : (
								<Button
									variant="success"
									onClick={addHeroHandler}
									className="button-hero-screen"
								>
									Add to my team
								</Button>
							)}
						</div>
						<div className="hero-screen-info">
							<ListGroup variant="flush">
								<ListGroup.Item>
									<strong>Full Name</strong>: {heroData.biography['full-name']}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Weight</strong>: {heroData.appearance.weight[1]}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Height</strong>: {heroData.appearance.height[1]}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Aliases</strong>:{' '}
									{heroData.biography.aliases.join(', ')}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Eye Color</strong>:{' '}
									{heroData.appearance['eye-color'].charAt(0).toUpperCase() +
										heroData.appearance['eye-color'].slice(1)}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Hair Color</strong>:{' '}
									{heroData.appearance['hair-color'].charAt(0).toUpperCase() +
										heroData.appearance['hair-color'].slice(1)}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Work Place</strong>: {heroData.work.base}
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className="hero-screen-chart">
							<HeroChart chartData={chartData} />
						</div>
					</div>
				</>
			) : null}
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

export default HeroScreen;

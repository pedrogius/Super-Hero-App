import React, { useEffect, useContext } from 'react';
import { Table, CardDeck, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import FlipCard from '../components/FlipCard';
import { AuthContext } from '../providers/authProvider';
import HeroChart from '../components/HeroChart';
import Meta from '../components/Helmet';
import { HeroContext } from '../providers/heroProvider';

const HomeScreen = ({ history }) => {
	const { store } = useContext(AuthContext);
	const { store: heroStore } = useContext(HeroContext);

	useEffect(() => {
		if (!store.isLoggedIn) {
			toast.dark('You must be logged in to view this page');
			history.push('/login');
		}
	}, [store, history]);

	const powerstats = {};
	const weight = [];
	const height = [];

	[...heroStore.goodHeroes, ...heroStore.badHeroes].forEach((hero) => {
		for (let [key, value] of Object.entries(hero.powerstats)) {
			if (powerstats[key]) {
				powerstats[key] += parseInt(value);
			} else {
				powerstats[key] = parseInt(value);
			}
		}
		weight.push(parseInt(hero.appearance.weight[1]));
		height.push(parseInt(hero.appearance.height[1]));
	});

	const average = (arr) => {
		return Math.round(arr.reduce((a, b) => a + b) / arr.length);
	};

	const sortedPowerstats = Object.entries(powerstats).sort(
		(a, b) => b[1] - a[1]
	);

	const chartData = Object.entries(powerstats).map((stat) => {
		return {
			name: stat[0].charAt(0).toUpperCase() + stat[0].slice(1),
			amt: parseInt(stat[1]),
			fullMark: 600,
		};
	});

	return (
		<>
			<Meta />
			{!heroStore.goodHeroes.length && !heroStore.badHeroes.length ? (
				<>
					<div className="jumbotron">
						<h1 className="display-4">Welcome to Super Hero App</h1>
						<p className="lead">
							To assemble your team, go to Search and add 3 good heroes and 3
							bad heroes.
						</p>
						<hr className="my-4" />
						<p>
							You can then come back here and see your team's combined stats,
							strengths and weaknesses.
						</p>
						<LinkContainer to={`/search`}>
							<Button variant="primary">Choose Wisely</Button>
						</LinkContainer>
					</div>
				</>
			) : (
				<div className="homescreen-container">
					<div className="powerstats-title">
						<h2>Powerstats</h2>
					</div>
					<div className="main-chart">
						<HeroChart chartData={chartData} />
					</div>
					<div className="main-title">
						<h1>Team Members</h1>
					</div>
					<Table striped bordered hover className="powerstats">
						<thead>
							<tr>
								<th></th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{sortedPowerstats &&
								sortedPowerstats.map((stat, idx) => (
									<tr key={idx}>
										<td>
											<strong>
												{stat[0].charAt(0).toUpperCase() + stat[0].slice(1)}
											</strong>
										</td>
										<td>{stat[1]}</td>
									</tr>
								))}
							{height.length ? (
								<>
									<tr>
										<td>Average Height</td>
										<td>{average(height)}cm</td>
									</tr>
									<tr>
										<td>Average Weight</td>
										<td>{average(weight)}kg</td>
									</tr>
								</>
							) : null}
						</tbody>
					</Table>

					<>
						{heroStore.goodHeroes.length ? (
							<>
								<div className="good-heroes-title">
									<h2>Good Heroes</h2>
								</div>
								<CardDeck className="good-heroes-cards">
									{heroStore.goodHeroes &&
										heroStore.goodHeroes.map((hero) => (
											<FlipCard hero={hero} key={hero.id} />
										))}
								</CardDeck>
							</>
						) : (
							<>
								<div className="good-heroes-title">
									<h2>Good Heroes</h2>
								</div>
								<CardDeck className="good-heroes-cards">
									<h5>No good heroes yet! Go to search to add some</h5>
								</CardDeck>
							</>
						)}
						{heroStore.badHeroes.length ? (
							<>
								<div className="bad-heroes-title">
									<h2>Bad Heroes</h2>
								</div>
								<CardDeck className="bad-heroes-cards">
									{heroStore.badHeroes &&
										heroStore.badHeroes.map((hero) => (
											<FlipCard hero={hero} key={hero.id} />
										))}
								</CardDeck>
							</>
						) : (
							<>
								<div className="bad-heroes-title">
									<h2>Bad Heroes</h2>
								</div>
								<CardDeck className="bad-heroes-cards">
									<h5>No bad heroes yet! Go to search to add some</h5>
								</CardDeck>
							</>
						)}
					</>
				</div>
			)}
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

export default HomeScreen;

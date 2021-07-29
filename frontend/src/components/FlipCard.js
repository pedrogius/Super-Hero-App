import React, { useState, useContext } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card, Button, ListGroup, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { HeroContext } from '../providers/heroProvider';
import {
	ADD_BAD_HERO,
	ADD_GOOD_HERO,
	REMOVE_BAD_HERO,
	REMOVE_GOOD_HERO,
} from '../constants/constants';

const FlipCard = ({ hero }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const { store, dispatch } = useContext(HeroContext);

	const allHeroes = [...store.goodHeroes, ...store.badHeroes];
	const powerstats = Object.entries(hero.powerstats);

	const addHeroHandler = () => {
		if (hero.biography.alignment === 'good' && store.goodHeroes.length < 3) {
			dispatch({ type: ADD_GOOD_HERO, payload: hero });
			toast.dark(`${hero.name} was added to the team!`);
		} else if (
			hero.biography.alignment === 'good' &&
			store.goodHeroes.length === 3
		) {
			toast.error("You can't add more than 3 good heroes to your team");
		} else if (
			hero.biography.alignment === 'bad' &&
			store.badHeroes.length < 3
		) {
			dispatch({ type: ADD_BAD_HERO, payload: hero });
			toast.dark(`${hero.name} was added to the team!`);
		} else if (
			hero.biography.alignment === 'bad' &&
			store.badHeroes.length === 3
		) {
			toast.error("You can't add more than 3 bad heroes to your team");
		}
	};

	const removeHeroHandler = () => {
		if (hero.biography.alignment === 'good') {
			dispatch({ type: REMOVE_GOOD_HERO, payload: hero.id });
			toast.dark(`${hero.name} was removed from the team!`);
		} else {
			dispatch({ type: REMOVE_BAD_HERO, payload: hero.id });
			toast.dark(`${hero.name} was removed from the team!`);
		}
	};

	const flipHandler = (e) => {
		e.preventDefault();
		setIsFlipped(!isFlipped);
	};

	return (
		<>
			<ReactCardFlip
				isFlipped={isFlipped}
				flipDirection="horizontal"
				key={hero.id}
			>
				<Card>
					<Card.Img variant="top" src={hero.image.url} />
					<Card.Body>
						<Card.Title className="mt-2">{hero.name}</Card.Title>
					</Card.Body>
					<ButtonGroup>
						{allHeroes.find((x) => x.id === hero.id) ? (
							<Button
								variant="danger"
								onMouseDown={(e) => e.preventDefault()}
								onClick={removeHeroHandler}
							>
								Remove
							</Button>
						) : (
							<Button
								variant="success"
								onMouseDown={(e) => e.preventDefault()}
								onClick={addHeroHandler}
							>
								Add to my team
							</Button>
						)}
						<Button variant="primary" onClick={flipHandler}>
							Stats
						</Button>
					</ButtonGroup>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Stats</Card.Title>
						<ListGroup variant="flush">
							{powerstats.map(([key, value]) => (
								<ListGroup.Item key={hero.id + key}>
									<strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
									<br /> {value}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Card.Body>
					<ButtonGroup>
						<LinkContainer to={`/hero/${hero.id}`}>
							<Button variant="primary">Hero Profile</Button>
						</LinkContainer>
						<Button variant="secondary" onClick={flipHandler}>
							Go Back
						</Button>
					</ButtonGroup>
				</Card>
			</ReactCardFlip>
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

export default FlipCard;

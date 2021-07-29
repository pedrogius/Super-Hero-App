import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import HeroScreen from './screens/HeroScreen';
import { AuthProvider } from './providers/authProvider';
import { HeroProvider } from './providers/heroProvider';
import './css/App.css';
import ErrorJumbotron from './components/ErrorJumbotron';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Header />
				<HeroProvider>
					<main className="py-3">
						<Container>
							<Switch>
								<Route path="/" component={HomeScreen} exact />
								<Route path="/login" component={LoginScreen} exact />
								<Route path="/search" component={SearchScreen} exact />
								<Route path="/hero/:id" component={HeroScreen} exact />
								<Route>
									<ErrorJumbotron
										statusCode={'404'}
										statusText={'Not Found'}
										message={"The page you are looking for doesn't exist"}
									/>
								</Route>
							</Switch>
						</Container>
					</main>
				</HeroProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;

import React from 'react';
import './App.css';
import { Home } from './routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Route path='/' exact>
					<Home />
				</Route>
			</Router>
		</div>
	);
}

export default App;

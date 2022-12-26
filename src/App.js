import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Layout from './components/Layout';

import './scss/app.scss';
import NotFound from './pages/NotFound';
import Pizza from './pages/Pizza';

function App() {
	return (
		<div className='wrapper'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='pizza/:id' element={<Pizza />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

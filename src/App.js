import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Layout from './components/Layout';

import './scss/app.scss';
import NotFound from './pages/NotFound';

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	return (
		<div className='wrapper'>
			<Routes>
				<Route
					path='/'
					element={
						<Layout searchValue={searchValue} setSearchValue={setSearchValue} />
					}
				>
					<Route index element={<Home searchValue={searchValue} />} />
					<Route path='cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

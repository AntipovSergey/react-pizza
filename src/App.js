import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Layout from './components/Layout';

import './scss/app.scss';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext();

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			<div className='wrapper'>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</div>
		</SearchContext.Provider>
	);
}

export default App;

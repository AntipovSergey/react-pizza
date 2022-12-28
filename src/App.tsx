import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';

import './scss/app.scss';

const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart')
);
const Pizza = React.lazy(
	() => import(/*webpackChunkName: "Pizza"*/ './pages/Pizza')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound "*/ './pages/NotFound')
);

function App() {
	return (
		<div className='wrapper'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route
						path='cart'
						element={
							<Suspense fallback={<div>Идет загрузка корзины...</div>}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path='pizza/:id'
						element={
							<Suspense fallback={<div>Идет загрузка пиццы...</div>}>
								<Pizza />
							</Suspense>
						}
					/>
					<Route
						path='*'
						element={
							<Suspense fallback={<div>Идет загрузка...</div>}>
								<NotFound />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;

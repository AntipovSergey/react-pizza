import React from 'react';
import axios from 'axios';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import { Skeleton } from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
	const [pizzas, setPizzas] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const getPizzas = async () => {
			const { data: pizzas } = await axios('http://localhost:3001/pizzas');
			setPizzas(pizzas);
			setIsLoading(false);
		};

		getPizzas();
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{isLoading
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

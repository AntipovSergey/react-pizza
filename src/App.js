import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';

import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock';

const pizzas = [
	{
		id: 0,
		imageUrl:
			'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
		title: 'Пепперони Фреш с перцем',
		types: [0, 1],
		sizes: [26, 30, 40],
		price: 803,
		category: 0,
		rating: 4,
	},
	{
		id: 1,
		imageUrl:
			'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
		title: 'Сырная',
		types: [0],
		sizes: [26, 40],
		price: 245,
		category: 0,
		rating: 6,
	},
	{
		id: 2,
		imageUrl:
			'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg',
		title: 'Цыпленок барбекю',
		types: [0],
		sizes: [26, 40],
		price: 295,
		category: 1,
		rating: 4,
	},
];

function App() {
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
						{pizzas.map(pizza => (
							<PizzaBlock key={pizza.id} {...pizza} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

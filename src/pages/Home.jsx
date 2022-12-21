import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

function Home() {
	const { searchValue } = React.useContext(SearchContext);

	const [pizzas, setPizzas] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	});
	const [page, setPage] = React.useState(1);

	React.useEffect(() => {
		const getPizzas = async () => {
			const { data: pizzas } = await axios('http://localhost:3001/pizzas');
			setPizzas(pizzas);
			setIsLoading(false);
		};

		getPizzas();
	}, []);

	React.useEffect(() => {
		const getPizzas = async () => {
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const sortBy = sortType.sortProperty.replace('-', '');
			const orderBy = sortType.sortProperty.startsWith('-') ? 'desc' : 'asc';
			const search = searchValue ? `title_like=${searchValue}` : '';

			const { data: pizzas } = await axios(
				`http://localhost:3001/pizzas?${search}${category}&_sort=${sortBy}&_order=${orderBy}&_page=${page}&_limit=4`
			);
			setPizzas(pizzas);
			setIsLoading(false);
		};
		setIsLoading(true);
		getPizzas();
	}, [categoryId, sortType, searchValue, page]);

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						setCategoryId={index => setCategoryId(index)}
					/>
					<Sort value={sortType} setSortType={index => setSortType(index)} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{isLoading
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination setPage={number => setPage(number)} />
				</div>
			</div>
		</div>
	);
}

export default Home;

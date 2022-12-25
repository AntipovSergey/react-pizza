import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setSortType } from '../redux/slices/filterSlice';
import { setPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
	const { searchValue } = React.useContext(SearchContext);
	const { categoryId, sortType, currentPage } = useSelector(
		state => state.filter
	);
	const { pizzas } = useSelector(state => state.pizzas);

	const dispatch = useDispatch();

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onSort = obj => {
		dispatch(setSortType(obj));
	};

	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const getPizzas = async () => {
			try {
				const { data: pizzas } = await axios('http://localhost:3001/pizzas');
				dispatch(setPizzas(pizzas));
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				alert('Ошибка при получении пицц!');
				console.log('Error', error);
			}
		};

		getPizzas();
	}, []);

	React.useEffect(() => {
		const getPizzas = async () => {
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const sortBy = sortType.sortProperty.replace('-', '');
			const orderBy = sortType.sortProperty.startsWith('-') ? 'desc' : 'asc';
			const search = searchValue ? `title_like=${searchValue}` : '';

			try {
				const { data: pizzas } = await axios(
					`http://localhost:3001/pizzas?${search}${category}&_sort=${sortBy}&_order=${orderBy}&_page=${currentPage}&_limit=4`
				);

				dispatch(setPizzas(pizzas));
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				alert('Ошибка при получении пицц!');
				console.log('Error', error);
			}
		};
		setIsLoading(true);
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories
						onChangeCategory={onChangeCategory}
						categoryId={categoryId}
					/>
					<Sort value={sortType} setSortType={onSort} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{isLoading
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination />
				</div>
			</div>
		</div>
	);
}

export default Home;

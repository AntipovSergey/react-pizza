import React from 'react';

import { useSelector } from 'react-redux';

import {
	selectFilter,
	setCategoryId,
	setSortType,
	Sort,
} from '../redux/slices/filterSlice';
import { fetchPizzas, Pizza, selectPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import SortPopup from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import NotFoundPizzas from '../components/NotFoundPizzas';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const { categoryId, sortType, currentPage, searchValue } =
		useSelector(selectFilter);
	const { pizzas, status } = useSelector(selectPizzas);

	const dispatch = useAppDispatch();

	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onSort = React.useCallback((obj: Sort) => {
		dispatch(setSortType(obj));
	}, []);

	React.useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const orderBy = sortType.sortProperty.startsWith('-') ? 'desc' : 'asc';
		const search = searchValue ? `title_like=${searchValue}` : '';
		dispatch(fetchPizzas({ category, sortBy, orderBy, search, currentPage }));
	}, [categoryId, sortType, searchValue, currentPage, dispatch]);

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories
						onChangeCategory={onChangeCategory}
						categoryId={categoryId}
					/>
					<SortPopup value={sortType} setSortType={onSort} />
				</div>
				{status !== 'Error' && <h2 className='content__title'>Все пиццы</h2>}
				{status === 'Error' ? (
					<NotFoundPizzas />
				) : (
					<div className='content__items'>
						{status === 'Loading'
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: pizzas.map((pizza: Pizza) => (
									<PizzaBlock key={pizza.id} {...pizza} />
							  ))}
					</div>
				)}
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination />
				</div>
			</div>
		</div>
	);
};

export default Home;

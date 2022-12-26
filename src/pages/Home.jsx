import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
	selectFilter,
	setCategoryId,
	setSortType,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import NotFoundPizzas from '../components/NotFoundPizzas';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

function Home() {
	const { categoryId, sortType, currentPage, searchValue } =
		useSelector(selectFilter);
	const { pizzas, status } = useSelector(selectPizzas);

	const dispatch = useDispatch();

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onSort = obj => {
		dispatch(setSortType(obj));
	};

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
					<Sort value={sortType} setSortType={onSort} />
				</div>
				{status !== 'Error' && <h2 className='content__title'>Все пиццы</h2>}
				{status === 'Error' ? (
					<NotFoundPizzas />
				) : (
					<div className='content__items'>
						{status === 'Loading'
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: pizzas.map(pizza => (
									<Link key={pizza.id} to={`pizza/${pizza.id}`}>
										<PizzaBlock {...pizza} />
									</Link>
							  ))}
					</div>
				)}
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination />
				</div>
			</div>
		</div>
	);
}

export default Home;

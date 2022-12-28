import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/filter/slice';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<ReactPaginate
			className={styles.wrapper}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
			pageRangeDisplayed={4}
			pageCount={3}
		/>
	);
};

export default Pagination;

import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ setPage }) => {
	return (
		<ReactPaginate
			className={styles.wrapper}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={event => setPage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;

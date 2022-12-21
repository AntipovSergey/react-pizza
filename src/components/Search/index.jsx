import React from 'react';

import styles from './Search.module.scss';

import search from '../../assets/img/search.svg';
import clear from '../../assets/img/close.svg';

const Search = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.wrapper}>
			<img className={styles.search} src={search} alt='Search' />
			<input
				placeholder='Поиск пиццы...'
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
			/>
			{searchValue && (
				<button className={styles.clear} onClick={() => setSearchValue('')}>
					<img src={clear} alt='Clear' />
				</button>
			)}
		</div>
	);
};

export default Search;

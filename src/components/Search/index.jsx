import React from 'react';
import _ from 'lodash';

import styles from './Search.module.scss';

import search from '../../assets/img/search.svg';
import clear from '../../assets/img/close.svg';

import { SearchContext } from '../../App';

const Search = () => {
	const [value, setValue] = React.useState('');
	const { setSearchValue } = React.useContext(SearchContext);
	const inputRef = React.useRef();

	const onClear = () => {
		setValue('');
		setSearchValue('');
		inputRef.current.focus();
	};

	const updateSearchValue = React.useCallback(
		_.debounce(str => {
			setSearchValue(str);
		}, 500),
		[]
	);

	const onChangeInput = e => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<img className={styles.search} src={search} alt='Search' />
			<input
				ref={inputRef}
				placeholder='Поиск пиццы...'
				value={value}
				onChange={onChangeInput}
			/>
			{value && (
				<button className={styles.clear} onClick={onClear}>
					<img src={clear} alt='Clear' />
				</button>
			)}
		</div>
	);
};

export default Search;

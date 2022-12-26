import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

import search from '../../assets/img/search.svg';
import clear from '../../assets/img/close.svg';

const Search: React.FC = () => {
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	const onClear = () => {
		setValue('');
		dispatch(setSearchValue(''));
		inputRef.current?.focus();
	};

	const updateSearchValue = React.useCallback(
		_.debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onChangeInput = (e: any) => {
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

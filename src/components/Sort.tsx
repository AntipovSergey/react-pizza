import React from 'react';
import { Sort } from '../redux/slices/filterSlice';

type SortProps = {
	value: Sort;
	setSortType: (obj: Sort) => void;
};

type PopupClick = MouseEvent & { path: Node[] };

const sortOptions: Sort[] = [
	{ name: 'популярности (ASC)', sortProperty: 'rating' },
	{ name: 'популярности (DESC)', sortProperty: '-rating' },
	{ name: 'цене (ASC)', sortProperty: 'price' },
	{ name: 'цене (DESC)', sortProperty: '-price' },
	{ name: 'алфавиту (ASC)', sortProperty: 'title' },
	{ name: 'алфавиту (DESC)', sortProperty: '-title' },
];

const SortPopup: React.FC<SortProps> = ({ value, setSortType }) => {
	const [isOpened, setIsOpened] = React.useState(false);
	const sortRef = React.useRef<HTMLDivElement>(null);

	const handleActiveSortOption = (obj: Sort) => {
		setSortType(obj);
		setIsOpened(false);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as PopupClick;
			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setIsOpened(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);

		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div className='sort' ref={sortRef}>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsOpened(!isOpened)}>{value.name}</span>
			</div>
			{isOpened && (
				<div className='sort__popup'>
					<ul>
						{sortOptions.map(sortOption => {
							return (
								<li
									key={sortOption.name}
									onClick={() => handleActiveSortOption(sortOption)}
									className={
										value.sortProperty === sortOption.sortProperty
											? 'active'
											: ''
									}
								>
									{sortOption.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SortPopup;

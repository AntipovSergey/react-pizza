import React from 'react';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories = ({ value, setCategoryId }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((category, categoryIndex) => {
					return (
						<li
							key={category}
							onClick={() => setCategoryId(categoryIndex)}
							className={value === categoryIndex ? 'active' : ''}
						>
							{category}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;

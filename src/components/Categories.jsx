import React from 'react';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories = ({ onChangeCategory, categoryId }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((category, categoryIndex) => {
					return (
						<li
							key={category}
							onClick={() => onChangeCategory(categoryIndex)}
							className={categoryId === categoryIndex ? 'active' : ''}
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

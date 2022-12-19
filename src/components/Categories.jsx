import React from 'react';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories = () => {
	const [activeCategory, setActiveCategory] = React.useState(0);

	return (
		<div className='categories'>
			<ul>
				{categories.map((category, categoryIndex) => {
					return (
						<li
							key={category}
							onClick={() => setActiveCategory(categoryIndex)}
							className={activeCategory === categoryIndex ? 'active' : ''}
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

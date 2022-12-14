import React from 'react';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые',
];

type CategoriesProps = {
	categoryId: number;
	onChangeCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ categoryId, onChangeCategory }) => {
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
	}
);

export default Categories;

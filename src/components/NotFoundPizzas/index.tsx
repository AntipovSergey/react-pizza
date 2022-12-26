import React from 'react';

import styles from './NotFoundPizzas.module.scss';

const index: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<h2>Произошла ошибка 😕</h2>
			<p>
				К сожалению, не удалось найти пиццы. Попробуйте повторить попытку позже
			</p>
		</div>
	);
};

export default index;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pizza = () => {
	const { id } = useParams();
	const [pizza, setPizza] = React.useState();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios(
					`http://localhost:3001/pizzas/${String(id)}`
				);
				setPizza(data);
			} catch (error) {
				navigate('/');
				throw new Error(error);
			}
		}

		fetchPizza();
	}, []);

	if (!pizza) {
		return <h2>Загрузка...</h2>;
	}

	return (
		<div>
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<p>{pizza.price}</p>
		</div>
	);
};

export default Pizza;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pizza: React.FC = () => {
	const { id } = useParams();
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
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
				alert('Ошибка при получении пиццы');
			}
		}

		fetchPizza();
	}, [id, navigate]);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div>
			<img src={pizza.imageUrl} alt='Pizza' />
			<h2>{pizza.title}</h2>
			<p>{pizza.price}</p>
		</div>
	);
};

export default Pizza;

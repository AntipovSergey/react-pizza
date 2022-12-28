import { calcTotalPizzas } from './calcTotalPizzas';
import { calcTotalPrice } from './calcTotalPrice';

export const getPizzasFromLS = () => {
	const data = localStorage.getItem('pizzas');
	const items = data ? JSON.parse(data) : [];
	const totalPizzas = calcTotalPizzas(items);
	const totalPrice = calcTotalPrice(items);

	return {
		items,
		totalPizzas,
		totalPrice,
	};
};

import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPizzas = (items: CartItem[]) => {
	return items.reduce((acc, item) => (acc += item.count), 0);
};

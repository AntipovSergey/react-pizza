import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((acc, item) => (acc += item.count * item.price), 0);
};

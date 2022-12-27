import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	totalPizzas: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	items: [],
	totalPrice: 0,
	totalPizzas: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(item => item.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce(
				(acc, obj) => (acc += obj.price * obj.count),
				0
			);

			state.totalPizzas = state.items.reduce(
				(acc, item) => (acc += item.count),
				0
			);
		},
		plusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find(item => item.id === action.payload);
			if (findItem) {
				findItem.count++;
			}

			state.totalPrice = state.items.reduce(
				(acc, item) => (acc += item.count * item.price),
				0
			);

			state.totalPizzas++;
		},
		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find(item => item.id === action.payload);
			if (findItem) {
				findItem.count--;

				state.totalPrice -= findItem.price;
				state.totalPizzas--;
				if (findItem.count === 0) {
					state.items = state.items.filter(obj => obj.id !== action.payload);
				}
			}
		},
		removeItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find(item => item.id === action.payload);
			state.items = state.items.filter(obj => obj.id !== action.payload);
			if (findItem) {
				state.totalPrice -= findItem.price * findItem.count;
				state.totalPizzas -= findItem.count;
			}
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalPizzas = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
	state.cart.items.find(item => item.id === id);

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
	cartSlice.actions;

export default cartSlice.reducer;

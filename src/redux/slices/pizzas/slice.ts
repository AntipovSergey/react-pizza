import { Status } from './../pizzas/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzaSliceState } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
	pizzas: [],
	status: Status.LOADING,
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas(state, action: PayloadAction<Pizza[]>) {
			state.pizzas = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.pizzas = [];
				state.status = Status.LOADING;
			})
			.addCase(
				fetchPizzas.fulfilled,
				(state, action: PayloadAction<Pizza[]>) => {
					state.pizzas = action.payload;
					state.status = Status.SUCCESS;
				}
			)
			.addCase(fetchPizzas.rejected, state => {
				state.pizzas = [];
				state.status = Status.ERROR;
			});
	},
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;

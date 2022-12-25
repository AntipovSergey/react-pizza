import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async ({ category, sortBy, orderBy, search, currentPage }) => {
		const { data: pizzas } = await axios(
			`http://localhost:3001/pizzas?${search}${category}&_sort=${sortBy}&_order=${orderBy}&_page=${currentPage}&_limit=4`
		);
		return pizzas;
	}
);

const initialState = {
	pizzas: [],
	status: 'pending',
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.pizzas = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.pizzas = [];
				state.status = 'Loading';
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.pizzas = action.payload;
				state.status = 'Success';
			})
			.addCase(fetchPizzas.rejected, state => {
				state.pizzas = [];
				state.status = 'Error';
			});
	},
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;

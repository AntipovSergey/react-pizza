import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = {
	category: string;
	sortBy: string;
	orderBy: string;
	search: string;
	currentPage: number;
};

export type Pizza = {
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	id: number;
};

export enum Status {
	LOADING = 'Loading',
	SUCCESS = 'Success',
	ERROR = 'Error',
}

interface PizzaSliceState {
	pizzas: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	pizzas: [],
	status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizzas/fetchPizzas',
	async ({ category, sortBy, orderBy, search, currentPage }) => {
		const { data } = await axios.get<Pizza[]>(
			`http://localhost:3001/pizzas?${search}${category}&_sort=${sortBy}&_order=${orderBy}&_page=${currentPage}&_limit=4`
		);
		return data;
	}
);

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

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;

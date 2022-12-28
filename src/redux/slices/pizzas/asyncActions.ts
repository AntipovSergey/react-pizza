import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzasArgs, Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizzas/fetchPizzas',
	async ({ category, sortBy, orderBy, search, currentPage }) => {
		const { data } = await axios.get<Pizza[]>(
			`http://localhost:3001/pizzas?${search}${category}&_sort=${sortBy}&_order=${orderBy}&_page=${currentPage}&_limit=4`
		);
		return data;
	}
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Sort = {
	name: string;
	sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

interface FilterSliceState {
	categoryId: number;
	sortType: Sort;
	currentPage: number;
	searchValue: string;
}

const initialState: FilterSliceState = {
	categoryId: 0,
	sortType: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	currentPage: 1,
	searchValue: '',
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortType(state, action: PayloadAction<Sort>) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
	},
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
	},
});

export const selectFilter = state => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;

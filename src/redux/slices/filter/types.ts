export type Sort = {
	name: string;
	sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

export interface FilterSliceState {
	categoryId: number;
	sortType: Sort;
	currentPage: number;
	searchValue: string;
}

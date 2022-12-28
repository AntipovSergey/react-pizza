export type FetchPizzasArgs = {
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

export interface PizzaSliceState {
	pizzas: Pizza[];
	status: Status;
}

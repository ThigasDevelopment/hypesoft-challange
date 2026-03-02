export interface ProductsParams {
	page?: number;
	search?: string;
	pageSize?: number;
	categoryId?: string;
};

export interface Product {
	id: string;

	name: string;
	description: string;

	price: number;
	stock: number;

	categoryId: string;

	createdAt: string;
	updatedAt: string;
};

export interface PaginatedResult<T> {
	items: T[ ];

	totalCount: number;

	pageNumber: number;
	pageSize: number;
};
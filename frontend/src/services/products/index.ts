import { api } from '../api';
import type { Product, PaginatedResult, ProductsParams } from '@/types';

export async function getProducts (params?: ProductsParams): Promise<PaginatedResult<Product>> {
	const response = await api.get('/products', { params });
	return response.data;
}
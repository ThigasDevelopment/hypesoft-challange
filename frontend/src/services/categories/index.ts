import { api } from '@/services/api';
import type { Category, CategoryParams, PaginatedResult } from '@/types';

export async function getCategories (params?: CategoryParams): Promise<PaginatedResult<Category>> {
	const response = await api.get ('/categories', { params });
	return response.data;
}
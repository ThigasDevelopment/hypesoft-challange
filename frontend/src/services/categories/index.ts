import { api } from '@/services/api';

import type { Category } from '@/types';

export async function getCategories (): Promise<Category[]> {
	const response = await api.get ('/categories');
	return response.data;
}

export async function getCategoryById (id: string): Promise<Category> {
	const response = await api.get (`/categories/${ id }`);
	return response.data;
}

export async function createCategory (category: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
	const response = await api.post ('/categories', category);
	return response.data;
}

export async function deleteCategory (id: string): Promise<void> {
	await api.delete (`/categories?id=${ id }`);
}
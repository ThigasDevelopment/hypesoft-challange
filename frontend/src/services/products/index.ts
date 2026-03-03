import { api } from '@/services/api';
import type { Product } from '@/types';

export async function getProducts (): Promise<Product[]> {
	const response = await api.get ('/products');
	return response.data;
}

export async function getProductById (id: string): Promise<Product> {
	const response = await api.get (`/products/${ id }`);
	return response.data;
}

export async function getProductsLowStock (): Promise<Product[]> {
	const response = await api.get ('/products/low-stock');
	return response.data;
}

export async function createProduct (product: Omit<Product, 'createdAt' | 'updatedAt'>): Promise<Product> {
	const response = await api.post ('/products', product);
	return response.data;
}

export async function deleteProduct (id: string): Promise<void> {
	await api.delete (`/products/${ id }`);
}

export async function updateProduct (id: string, product: Omit<Product, 'id'>): Promise<Product> {
	const response = await api.put (`/products/${ id }`, product);
	return response.data;
}
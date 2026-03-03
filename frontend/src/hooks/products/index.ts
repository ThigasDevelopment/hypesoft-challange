import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getProducts, createProduct, getProductsLowStock, updateProduct, deleteProduct } from '@/services/products';
import type { Product } from '@/types/services/products';

export function useProducts () {
	return useQuery ({
		queryKey: [ 'products' ],
		queryFn: () => getProducts (),
	});
}

export function useGetProductsByCategory () {
	const { data } = useProducts ();
	if (!data)
		return [ ];

	const list = [ ] as { categoryId: string, amount: number }[];
	data.map (
		product => {
			const category = list.find (item => item.categoryId === product.categoryId);
			if (category)
				category.amount += product.stock;
			else
				list.push ({ categoryId: product.categoryId, amount: product.stock });
		}
	);
	return list;
}

export function useProductsLowStock () {
	return useQuery ({
		queryKey: [ 'products', 'low-stock' ],
		queryFn: () => getProductsLowStock (),
	});
}

export function useCreateProduct () {
	const queryClient = useQueryClient ();

	return useMutation ({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries ({ queryKey: [ 'products' ] });
		}
	});
}

export function useDeleteProduct () {
	const queryClient = useQueryClient ();

	return useMutation ({
		mutationFn: (id: string) => deleteProduct (id),
		onSuccess: () => {
			queryClient.invalidateQueries ({ queryKey: [ 'products' ] });
		}
	});
}

export function useUpdateProduct () {
	const queryClient = useQueryClient ();

	return useMutation ({
		mutationFn: ({ id, data }: { id: string, data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> }) => updateProduct (id, data),
		onSuccess: () => {
			queryClient.invalidateQueries ({ queryKey: [ 'products' ] });
		}
	});
}
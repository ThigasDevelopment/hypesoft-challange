import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getProducts, createProduct, getProductsLowStock } from '@/services/products';

export function useProducts () {
	return useQuery ({
		queryKey: [ 'products' ],
		queryFn: () => getProducts (),
	});
}

export function useProductsLowStock () {
	return useQuery ({
		queryKey: [ 'products', 'low-stock' ],
		queryFn: () => getProductsLowStock (),
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ 'products' ] });
		}
	});
}
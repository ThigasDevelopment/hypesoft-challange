import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getProducts, createProduct, getProductsLowStock } from '@/services/products';

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
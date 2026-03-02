import { useQuery } from '@tanstack/react-query';

import type { ProductsParams } from '@/types';
import { getProducts } from '@/services/products';

export function useProducts (params?: ProductsParams) {
	return useQuery ({
		queryKey: [ 'products', params ],
		queryFn: () => getProducts (params),
	});
}
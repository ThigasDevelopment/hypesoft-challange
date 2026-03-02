import { useQuery } from '@tanstack/react-query';

import type { CategoryParams } from '@/types';
import { getCategories } from '@/services/categories';

export function useCategories (params?: CategoryParams) {
	return useQuery ({
		queryKey: [ 'categories', params ],
		queryFn: () => getCategories (params),
	});
}
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCategories, createCategory } from '@/services/categories';

export function useCategories () {
	return useQuery ({
		queryKey: [ 'categories' ],
		queryFn: () => getCategories (),
	});
}

export function useCategoriesName () {
	const { data } = useCategories ();
	if (!data)
		return { data: [ ], byId: { } };

	const byId = { } as Record<string, string>;
	data.map (
		category => byId[category.id] = category.name
	);

	return { data: data.map (category => category.name), byId };
}

export function useCreateCategory () {
	const queryClient = useQueryClient ();

	return useMutation ({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries ({ queryKey: [ 'categories' ] });
		}
	});
}
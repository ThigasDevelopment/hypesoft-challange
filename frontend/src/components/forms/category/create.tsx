import { useRef } from 'react';

import { useAuth } from 'react-oidc-context';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { toast } from 'sonner';

import { useCreateCategory } from '@/hooks/categories';
import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Field, FieldError, FieldGroup, Input, Label } from '@components/ui';

const createCategorySchema = z.object ({
	name: z.string ().min (5, 'O nome da categoria deve conter pelo menos 5 caracteres.'),
});

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export function CreateCategoryForm () {
	const closeRef = useRef <HTMLButtonElement> (null);
	const auth = useAuth ();

	const { control, reset, handleSubmit } = useForm<CreateCategoryFormData> ({
		resolver: zodResolver (createCategorySchema) as any,

		defaultValues: {
			name: '',
		}
	});

	const createdMutation = useCreateCategory ();

	async function handleCreateCategory (data: CreateCategoryFormData) {
		const { name } = data;
		const userId = auth.user?.profile?.sub;
		
		try {
			await createdMutation.mutateAsync ({ name, adminId: userId as string });
			toast.success ('Categoria criada com sucesso!');

			reset ();
			closeRef.current?.click ();
		} catch (err) {
			toast.error ('Ocorreu um erro ao criar a categoria. Por favor, tente novamente.');
		}
	}

	return (
		<DialogContent className = 'w-full max-w-xs sm:max-w-lg mx-auto px-2' showCloseButton = { false }>
			<DialogHeader className = 'p-2'>
				<DialogTitle>Criar categoria</DialogTitle>
				<DialogDescription className = 'text-muted/50'>
					Preencha os campos abaixo para criar uma nova categoria.
				</DialogDescription>
			</DialogHeader>

			<form id = 'form-create-category' onSubmit = { handleSubmit (handleCreateCategory) } className = 'space-y-4'>
				<FieldGroup>
					<Controller
						name = 'name'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-category-name' className = 'pl-1 text-sm font-medium'>Nome</Label>
									<Input { ...field } id = 'form-category-name' aria-invalid = { fieldState.invalid } placeholder = 'Nome da categoria' autoComplete = 'off'/>

									{
										fieldState.invalid && (
											<div className = 'col-start-2 col-span-3'>
												<FieldError errors = { [ fieldState.error ] }/>
											</div>
										)
									}
								</Field>
							)
						}
					/>
				</FieldGroup>
			</form>

			<DialogFooter>
				<DialogClose asChild>
					<Button ref = { closeRef } variant = 'outline' onClick = { () => reset () }>Cancelar</Button>
				</DialogClose>
				
				<Button type = 'submit' form = 'form-create-category'>Criar</Button>
			</DialogFooter>
		</DialogContent>
	)
}
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Field, FieldError, FieldGroup, Input, Label } from '@components/ui';

const createCategorySchema = z.object ({
	name: z.string ().min (5, 'O nome da categoria deve conter pelo menos 5 caracteres.'),
});

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export function CreateCategoryForm () {
	const { control, reset, handleSubmit } = useForm<CreateCategoryFormData> ({
		resolver: zodResolver (createCategorySchema) as any,

		defaultValues: {
			name: '',
		}
	});

	function handleCreateCategory (data: CreateCategoryFormData) {
		console.log (data);
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

						render = { ({ field, fieldState }) => (
							<Field data-invalid = { fieldState.invalid } className = 'grid grid-cols-4 items-center justify-between gap-x-4 gap-y-1 p-2'>
								<Label htmlFor = 'form-category-name' className = 'text-sm font-medium'>Nome</Label>
								<Input { ...field } className = 'col-span-3' id = 'form-category-name' aria-invalid = { fieldState.invalid } placeholder = 'Nome da categoria' autoComplete = 'off'/>

								{
									fieldState.invalid && (
										<div className = 'col-start-2 col-span-3'>
											<FieldError errors = { [ fieldState.error ] }/>
										</div>
									)
								}
							</Field>
						) }
					/>
				</FieldGroup>
			</form>

			<DialogFooter>
				<DialogClose asChild>
					<Button variant = 'outline' onClick = { () => reset () }>Cancelar</Button>
				</DialogClose>
				
				<Button type = 'submit' form = 'form-create-category'>Criar</Button>
			</DialogFooter>
		</DialogContent>
	)
}
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Field, FieldError, FieldGroup, Input, Label } from '@components/ui';

const createProductSchema = z.object ({
	name: z.string ().min (5, 'O nome do produto deve conter pelo menos 5 caracteres.'),
	description: z.string ().min (10, 'A descrição do produto deve conter pelo menos 10 caracteres.'),

	price: z.coerce.number (),
	stock: z.coerce.number ().min (1, 'O estoque do produto deve ser no mínimo 1.'),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProductForm () {
	const { control, reset, handleSubmit } = useForm<CreateProductFormData> ({
		resolver: zodResolver (createProductSchema) as any,

		defaultValues: {
			name: '',
			description: '',
			price: 0,
			stock: 1,
		}
	});

	function handleCreateProduct (data: CreateProductFormData) {
		console.log (data);
	}

	return (
		<DialogContent className = 'w-full max-w-xs sm:max-w-lg mx-auto px-2' showCloseButton = { false }>
			<DialogHeader className = 'p-2'>
				<DialogTitle>Criar produto</DialogTitle>
				<DialogDescription className = 'text-muted/50'>
					Preencha os campos abaixo para criar um novo produto.
				</DialogDescription>
			</DialogHeader>

			<form id = 'form-create-product' onSubmit = { handleSubmit (handleCreateProduct) } className = 'space-y-4'>
				<FieldGroup>
					<Controller
						name = 'name'
						control = { control }

						render = { ({ field, fieldState }) => (
							<Field data-invalid = { fieldState.invalid } className = 'grid grid-cols-4 items-center justify-between gap-x-4 gap-y-1'>
								<Label htmlFor = 'form-product-name' className = 'text-sm font-medium'>Nome</Label>
								<Input { ...field } className = 'col-span-3' id = 'form-product-name' aria-invalid = { fieldState.invalid } placeholder = 'Nome do produto' autoComplete = 'off'/>

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

				<FieldGroup>
					<Controller
						name = 'description'
						control = { control }

						render = { ({ field, fieldState }) => (
							<Field data-invalid = { fieldState.invalid } className = 'grid grid-cols-4 items-center justify-between gap-x-4 gap-y-1'>
								<Label htmlFor = 'form-product-description' className = 'text-sm font-medium'>Descrição</Label>
								<Input { ...field } className = 'col-span-3' id = 'form-product-description' aria-invalid = { fieldState.invalid } placeholder = 'Descrição do produto' autoComplete = 'off'/>

								{
									fieldState.invalid && (
										<div className = 'col-start-2 col-span-3 mt-1'>
											<FieldError errors = { [ fieldState.error ] }/>
										</div>
									)
								}
							</Field>
						) }
					/>
				</FieldGroup>

				<FieldGroup>
					<Controller
						name = 'stock'
						control = { control }

						render = { ({ field, fieldState }) => (
							<Field data-invalid = { fieldState.invalid } className = 'grid grid-cols-4 items-center justify-between gap-x-4 gap-y-1'>
								<Label htmlFor = 'form-product-stock' className = 'text-sm font-medium'>Estoque</Label>
								<Input { ...field } className = 'col-span-3' id = 'form-product-stock' aria-invalid = { fieldState.invalid } placeholder = 'Estoque do produto' autoComplete = 'off'/>

								{
									fieldState.invalid && (
										<div className = 'col-start-2 col-span-3 mt-1'>
											<FieldError errors = { [ fieldState.error ] }/>
										</div>
									)
								}
							</Field>
						) }
					/>
				</FieldGroup>

				<FieldGroup>
					<Controller
						name = 'price'
						control = { control }

						render = { ({ field, fieldState }) => (
							<Field data-invalid = { fieldState.invalid } className = 'grid grid-cols-4 items-center justify-between gap-x-4 gap-y-1'>
								<Label htmlFor = 'form-product-price' className = 'text-sm font-medium'>Preço</Label>
								<Input { ...field } className = 'col-span-3' id = 'form-product-price' aria-invalid = { fieldState.invalid } placeholder = 'Preço do produto' autoComplete = 'off'/>

								{
									fieldState.invalid && (
										<div className = 'col-start-2 col-span-3 mt-1'>
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
				
				<Button type = 'submit' form = 'form-create-product'>Criar</Button>
			</DialogFooter>
		</DialogContent>
	)
}
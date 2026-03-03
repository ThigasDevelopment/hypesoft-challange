import { useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCategories } from '@/hooks/categories';
import { useCreateProduct, useUpdateProduct } from '@/hooks/products';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Field, FieldError, FieldGroup, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui';

const createProductSchema = z.object ({
	name: z.string ().min (5, 'O nome do produto deve conter pelo menos 5 caracteres.'),
	description: z.string ().min (10, 'A descrição do produto deve conter pelo menos 10 caracteres.'),

	category: z.string (),

	price: z.coerce.number (),
	stock: z.coerce.number ().min (1, 'O estoque do produto deve ser no mínimo 1.'),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProductForm ({ type = 'create', info }: { type?: 'create' | 'edit', info?: { id: string, name: string, description: string, categoryId: string, price: number, stock: number } }) {
	const { control, reset, handleSubmit } = useForm<CreateProductFormData> ({
		resolver: zodResolver (createProductSchema) as any,

		defaultValues: {
			name: info?.name || '',
			description: info?.description || '',
			category: info?.categoryId || '',
			price: info?.price || 0,
			stock: info?.stock || 1,
		}
	});

	const categoriesQuery = useCategories ();
	const closeRef = useRef <HTMLButtonElement> (null);

	const [ allCategories ] = useMemo (
		() => {
			const categories = categoriesQuery.data ? [ ...categoriesQuery.data ] : [ ];

			return [ categories ];
		}, [ categoriesQuery.data ]
	)

	const createMutation = useCreateProduct ();
	async function handleCreateProduct (data: CreateProductFormData) {
		try {
			await createMutation.mutateAsync ({
				name: data.name,
				description: data.description,
				categoryId: data.category,
				price: Number (data.price),
				stock: Number (data.stock),
			});
			toast.success (`Produto ${ data.name } criado com sucesso!`);
			
			reset ();
			closeRef.current?.click ();
		} catch (err) {
			toast.error ('Ocorreu um erro ao criar o produto. Por favor, tente novamente.');
		}
	}

	const updateMutation = useUpdateProduct ();
	async function handleEditProduct (data: CreateProductFormData) {
		console.log (info);

		if (!info?.id)
			return toast.error ('ID do produto não encontrado. Por favor, tente novamente.');

		try {
			await updateMutation.mutateAsync ({
				id: info?.id,

				data: {
					name: data.name,
					description: data.description,
					categoryId: data.category,
					price: Number (data.price),
					stock: Number (data.stock),
				}
			});
			toast.success (`Produto ${ data.name } editado com sucesso!`);
			
			reset ();
			closeRef.current?.click ();
		} catch (err) {
			toast.error ('Ocorreu um erro ao editar o produto. Por favor, tente novamente.');
		}
	}

	return (
		<DialogContent className = 'w-full max-w-xs sm:max-w-lg mx-auto px-2' showCloseButton = { false }>
			<DialogHeader className = 'p-2'>
				<DialogTitle>{ type === 'create' ? 'Criar produto' : 'Editar produto' }</DialogTitle>
				<DialogDescription className = 'text-muted/50'>
					Preencha os campos abaixo para { type === 'create' ? 'criar um novo produto.' : 'editar o produto.' }
				</DialogDescription>
			</DialogHeader>

			<form id = 'form-create-product' onSubmit = { handleSubmit (type === 'create' ? handleCreateProduct : handleEditProduct) } className = 'space-y-4'>
				<FieldGroup>
					<Controller
						name = 'name'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-product-name' className = 'pl-1 text-sm font-medium'>Nome</Label>
									<Input { ...field } id = 'form-product-name' aria-invalid = { fieldState.invalid } placeholder = 'Nome do produto' autoComplete = 'off'/>

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

				<FieldGroup>
					<Controller
						name = 'description'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-product-desc' className = 'pl-1 text-sm font-medium'>Descrição</Label>
									<Input { ...field } id = 'form-product-desc' aria-invalid = { fieldState.invalid } placeholder = 'Descrição do produto' autoComplete = 'off'/>

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

				<FieldGroup>
					<Controller
						name = 'category'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-product-category' className = 'pl-1 text-sm font-medium'>Categoria</Label>
									
									<Select value = { field.value || info?.categoryId } onValueChange = { field.onChange }>
										<SelectTrigger className = 'w-full'>
											<SelectValue placeholder = 'Selecione a categoria do produto'/>
										</SelectTrigger>

										<SelectContent>
											<SelectGroup>
												{
													allCategories.length > 0 ? (
														allCategories.map (
															category => (
																<SelectItem key = { category.id } value = { String (category.id) }>
																	{ category.name }
																</SelectItem>
															)
														)
													) : (
														<p className = 'text-center py-2 text-muted-foreground'>
															Nenhuma categoria encontrada
														</p>
													)
												}
											</SelectGroup>
										</SelectContent>
									</Select>

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

				<FieldGroup>
					<Controller
						name = 'price'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-product-price' className = 'pl-1 text-sm font-medium'>Preço</Label>
									<Input { ...field } id = 'form-product-price' aria-invalid = { fieldState.invalid } placeholder = 'Preço do produto' autoComplete = 'off'/>

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

				<FieldGroup>
					<Controller
						name = 'stock'
						control = { control }

						render = {
							({ field, fieldState }) => (
								<Field data-invalid = { fieldState.invalid } className = 'flex flex-col'>
									<Label htmlFor = 'form-product-stock' className = 'pl-1 text-sm font-medium'>Estoque inicial</Label>
									<Input { ...field } id = 'form-product-stock' aria-invalid = { fieldState.invalid } placeholder = 'Estoque do produto' autoComplete = 'off'/>

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
				
				<Button type = 'submit' form = 'form-create-product'>{ type === 'create' ? 'Criar' : 'Editar' }</Button>
			</DialogFooter>
		</DialogContent>
	)
}
'use client';

import { style } from './style';

import { useMemo, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function FieldSet ({ className, ...props }: ComponentProps<'fieldset'>) {
	return (
		<fieldset
			data-slot = 'field-set'
			className = { cn ('gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col', className) }

			{ ...props }
		/>
	)
}

export function FieldLegend ({ className, variant = 'default', ...props }: ComponentProps<'legend'> & { variant?: 'default' | 'label' | 'legend' }) {
	return (
		<legend
			data-slot = 'field-legend'
			data-variant = { variant }

			className = { cn ('mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className) }

			{ ...props }
		/>
	)
}

export function FieldGroup ({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot = 'field-group'
			className = { cn ('gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col', className) }

			{ ...props }
		/>
	)
}

export function Field ({ className, orientation = 'vertical', ...props }: ComponentProps<'div'> & { orientation?: 'vertical' | 'horizontal' | 'responsive' }) {
	return (
		<div
			role = 'group'

			data-slot = 'field'
			data-orientation = { orientation }

			className = { cn (style ({ orientation }), className) }

			{ ...props }
		/>
	)
}

export function FieldContent ({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot = 'field-content'
			className = { cn ('gap-0.5 group/field-content flex flex-1 flex-col leading-snug', className) }

			{ ...props }
		/>
	)
}

export function FieldTitle ({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot = 'field-title'
			className = { cn ('gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug', className) }

			{ ...props }
		/>
	)
}

export function FieldDescription ({ className, ...props }: ComponentProps<'p'>) {
	return (
		<p
			data-slot = 'field-description'
			className = { cn ('text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-horizontal/field:text-balance', 'last:mt-0 nth-last-2:-mt-1', '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4', className) }

			{ ...props }
		/>
	)
}

export function FieldError ({ className, children, errors, ...props }: ComponentProps<'div'> & { errors?: Array<{ message?: string } | undefined> }) {
	const content = useMemo (
		() => {
			if (children) return children;
			if (!errors?.length) return null;

			const uniqueErrors = [
				...new Map (errors.map (error => [error?.message, error])).values (),
			];
			if (uniqueErrors?.length == 1) return uniqueErrors[0]?.message;

			return (
				<ul className = 'ml-4 flex list-disc flex-col gap-1'>
					{
						uniqueErrors.map (
							(error, index) => error?.message && <li key = { index }>{ error.message }</li>
						)
					}
				</ul>
			)
		}, [ children, errors ]
	);

	if (!content) return null;
	
	return (
		<div
			role = 'alert'

			data-slot = 'field-error'
			className = { cn ('text-danger text-sm font-normal', className) }

			{ ...props }
		>
			{ content }
		</div>
	)
}
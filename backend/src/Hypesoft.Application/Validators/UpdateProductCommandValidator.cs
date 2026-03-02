using Hypesoft.Application.Commands;

using FluentValidation;

namespace Hypesoft.Application.Validators;

public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
{
	public UpdateProductCommandValidator ()
	{
		RuleFor(x => x.Id)
			.NotEmpty()
			.WithMessage("Product ID is required.");
	}
}
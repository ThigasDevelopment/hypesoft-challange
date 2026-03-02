using Hypesoft.Application.Commands;

using FluentValidation;

namespace Hypesoft.Application.Validators;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
	public CreateCategoryCommandValidator ()
	{
		RuleFor(x => x.Name)
			.NotEmpty()
			.WithMessage("Category name is required.");

		RuleFor(x => x.AdminId)
			.NotEmpty()
			.WithMessage("Admin ID is required.");
	}
}
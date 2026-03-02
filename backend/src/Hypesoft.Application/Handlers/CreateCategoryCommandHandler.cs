using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Commands;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Category>
{
	private readonly ICategoryRepository _repository;

	public CreateCategoryCommandHandler(ICategoryRepository repository)
	{
		_repository = repository;
	}

	public async Task<Category> Handle(CreateCategoryCommand request, CancellationToken token)
	{
		var category = new Category
		{
			Name = request.Name
		};

		await _repository.CreateAsync(category);
		return category;
	}
}
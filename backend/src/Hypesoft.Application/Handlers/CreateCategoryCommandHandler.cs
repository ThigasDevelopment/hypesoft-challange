using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Exceptions;
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
		var exists = await _repository.GetByNameAsync(request.Name);
		if (exists != null)
			throw new ConflictException("Category with the same name already exists.");

		var category = new Category
		{
			Name = request.Name,
			AdminId = request.AdminId
		};

		await _repository.CreateAsync(category);
		return category;
	}
}
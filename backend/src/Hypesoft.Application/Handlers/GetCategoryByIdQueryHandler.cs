using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Queries;

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, Category?>
{
	private readonly ICategoryRepository _repository;

	public GetCategoryByIdQueryHandler(ICategoryRepository repository)
	{
		_repository = repository;
	}

	public async Task<Category?> Handle(GetCategoryByIdQuery request, CancellationToken token)
	{
		return await _repository.GetByIdAsync(request.Id);
	}
}
using System.Security.Cryptography.X509Certificates;
using Hypesoft.Application.Queries;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Handlers;

public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, List<Category>>
{
	private readonly ICategoryRepository _repository;

	public GetAllCategoriesQueryHandler(ICategoryRepository repository)
	{
		_repository = repository;
	}

	public async Task<List<Category>> Handle(GetAllCategoriesQuery request, CancellationToken token)
	{
		return await _repository.GetAllAsync();
	}
}
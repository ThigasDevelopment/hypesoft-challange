using Hypesoft.Application.Queries;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Handlers;

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, List<Product>>
{
	private readonly IProductRepository _repository;

	public GetAllProductsQueryHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<List<Product>> Handle(GetAllProductsQuery request, CancellationToken token)
	{
		return await _repository.GetAllAsync();
	}
}
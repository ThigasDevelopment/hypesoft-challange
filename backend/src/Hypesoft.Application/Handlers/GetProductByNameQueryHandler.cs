using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByNameQueryHandler : IRequestHandler<GetProductByNameQuery, Product?>
{
	private readonly IProductRepository _repository;

	public GetProductByNameQueryHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<Product?> Handle(GetProductByNameQuery request, CancellationToken token)
	{
		return await _repository.GetByNameAsync(request.Name);
	}
}
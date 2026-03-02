using Hypesoft.Application.Queries;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Handlers;

public class GetProductsLowStockQueryHandler : IRequestHandler<GetProductsLowStockQuery, List<Product>>
{
	private readonly IProductRepository _repository;

	public GetProductsLowStockQueryHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<List<Product>> Handle(GetProductsLowStockQuery request, CancellationToken token)
	{
		var allProducts = await _repository.GetAllAsync();
		return allProducts.Where(product => product.Stock < 11).ToList();
	}
}
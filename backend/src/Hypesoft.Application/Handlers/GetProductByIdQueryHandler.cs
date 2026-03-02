using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Product?>
{
	private readonly IProductRepository _repository;

	public GetProductByIdQueryHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<Product?> Handle(GetProductByIdQuery request, CancellationToken token)
	{
		return await _repository.GetByIdAsync(request.Id);
	}
}
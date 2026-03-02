using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Commands;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
{
	private readonly IProductRepository _repository;

	public CreateProductCommandHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<Product> Handle(CreateProductCommand request, CancellationToken token)
	{
		var exists = await _repository.GetByNameAsync(request.Name);
		if (exists is not null && exists.CategoryId == request.CategoryId)
		{
			throw new Exception("Product with the same name already exists.");
		}

		var product = new Product
		{
			Name = request.Name,
			Description = request.Description,
			Price = request.Price,
			Stock = request.Stock,
			CategoryId = request.CategoryId
		};

		await _repository.CreateAsync(product);
		return product;
	}
}
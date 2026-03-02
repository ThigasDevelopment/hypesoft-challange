using Hypesoft.Application.Commands;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Commands;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Product?>
{
	private readonly IProductRepository _repository;

	public UpdateProductCommandHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<Product?> Handle(UpdateProductCommand request, CancellationToken token)
	{
		var product = await _repository.GetByIdAsync(request.Id);
		if (product == null)
			return null;

		var exists = await _repository.GetByNameAsync(request.Name);
		if (exists is not null && exists.Id != request.Id && exists.CategoryId == request.CategoryId)
		{
			throw new Exception("Product with the same name already exists.");
		}

		product.Name = request.Name;
		product.Description = request.Description;
		product.Price = request.Price;
		product.Stock = request.Stock;
		product.CategoryId = request.CategoryId;
		product.UpdatedAt = DateTime.UtcNow;

		await _repository.UpdateAsync(request.Id, product);
		return product;
	}
}
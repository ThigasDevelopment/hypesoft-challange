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

		product.Name = request.Name;
		product.Description = request.Description;
		product.Price = request.Price;
		product.Stock = request.Stock;
		product.CategoryId = request.CategoryId;

		await _repository.UpdateAsync(request.Id, product);
		return product;
	}
}
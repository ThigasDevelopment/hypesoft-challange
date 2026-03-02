using Hypesoft.Application.Commands;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Commands;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, bool>
{
	private readonly IProductRepository _repository;

	public DeleteProductCommandHandler(IProductRepository repository)
	{
		_repository = repository;
	}

	public async Task<bool> Handle(DeleteProductCommand request, CancellationToken token)
	{
		var product = await _repository.GetByIdAsync(request.Id);
		if (product == null)
			return false;

		await _repository.DeleteAsync(request.Id);
		return true;
	}
}
using Hypesoft.Application.Commands;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using MediatR;

namespace Hypesoft.Application.Commands;

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, bool>
{
	private readonly ICategoryRepository _repository;

	public DeleteCategoryCommandHandler(ICategoryRepository repository)
	{
		_repository = repository;
	}

	public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken token)
	{
		var category = await _repository.GetByIdAsync(request.Id);
		if (category == null)
			return false;

		await _repository.DeleteAsync(request.Id);
		return true;
	}
}
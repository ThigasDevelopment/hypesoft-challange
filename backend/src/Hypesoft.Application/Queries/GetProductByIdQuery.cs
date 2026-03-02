using Hypesoft.Domain.Entities;

using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByIdQuery : IRequest<Product?>
{
	public string Id { get; set; }

	public GetProductByIdQuery(string id)
	{
		Id = id;
	}
}
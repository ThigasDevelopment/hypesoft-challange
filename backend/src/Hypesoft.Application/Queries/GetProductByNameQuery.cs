using Hypesoft.Domain.Entities;

using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByNameQuery : IRequest<Product?>
{
	public string Name { get; set; }

	public GetProductByNameQuery(string name)
	{
		Name = name;
	}
}
using Hypesoft.Domain.Entities;

using MediatR;

namespace Hypesoft.Application.Queries;
public record GetAllProductsQuery : IRequest<List<Product>>;
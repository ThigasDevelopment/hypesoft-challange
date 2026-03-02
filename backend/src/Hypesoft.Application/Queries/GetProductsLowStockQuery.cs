using Hypesoft.Domain.Entities;

using MediatR;

namespace Hypesoft.Application.Queries;
public record GetProductsLowStockQuery : IRequest<List<Product>>;
using Hypesoft.Domain.Entities;

using MediatR;

namespace Hypesoft.Application.Queries;
public record GetAllCategoriesQuery : IRequest<List<Category>>;
using Hypesoft.Application.Commands;

using MediatR;

namespace Hypesoft.Application.Commands;
public record DeleteCategoryCommand(string Id) : IRequest<bool>;
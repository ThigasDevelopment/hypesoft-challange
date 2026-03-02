using Hypesoft.Application.Commands;
using Hypesoft.Application.Queries;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MediatR;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
	private readonly IMediator _mediator;

	public CategoriesController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	public async Task<IActionResult> GetAll([FromQuery] string? id)
	{
		if (!string.IsNullOrEmpty(id))
			return await GetById(id);

		var query = new GetAllCategoriesQuery();

		var result = await _mediator.Send(query);
		return Ok(result);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(string id)
	{
		var query = new GetCategoryByIdQuery(id);

		var result = await _mediator.Send(query);
		if (result == null)
			return NotFound();

		return Ok(result);
	}

	[Authorize]
	[HttpPost]
	public async Task<IActionResult> Create([FromBody] CreateCategoryCommand command)
	{
		var result = await _mediator.Send(command);
		return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
	}

	[Authorize]
	[HttpDelete]
	public async Task<IActionResult> Delete([FromQuery] string id)
	{
		var command = new DeleteCategoryCommand(id);

		var result = await _mediator.Send(command);
		if (!result)
			return NotFound();

		return NoContent();
	}
}
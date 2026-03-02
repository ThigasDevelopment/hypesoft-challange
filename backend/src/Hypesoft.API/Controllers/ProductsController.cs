using Hypesoft.Application.Commands;
using Hypesoft.Application.Queries;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MediatR;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
	private readonly IMediator _mediator;

	public ProductsController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		var query = new GetAllProductsQuery();

		var result = await _mediator.Send(query);
		return Ok(result);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(string id)
	{
		var query = new GetProductByIdQuery(id);

		var result = await _mediator.Send(query);
		if (result == null)
			return NotFound();

		return Ok(result);
	}

	[Authorize]
	[HttpPost]
	public async Task<IActionResult> Create([FromBody] CreateProductCommand command)
	{
		var result = await _mediator.Send(command);
		return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
	}

	[Authorize]
	[HttpPut("{id}")]
	public async Task<IActionResult> Update(string id, [FromBody] UpdateProductCommand command)
	{
		if (id != command.Id)
			return BadRequest("ID mismatch");

		var result = await _mediator.Send(command);
		if (result == null)
			return NotFound();

		return Ok(result);
	}

	[Authorize]
	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(string id)
	{
		var command = new DeleteProductCommand(id);

		var result = await _mediator.Send(command);
		if (!result)
			return NotFound();

		return NoContent();
	}
}
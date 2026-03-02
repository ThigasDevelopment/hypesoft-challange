using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using Microsoft.AspNetCore.Mvc;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
	private readonly IProductRepository _repository;

	public ProductsController(IProductRepository repository)
	{
		_repository = repository;
	}

	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		var result = await _repository.GetAllAsync();
		return Ok(result);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(string id)
	{
		var result = await _repository.GetByIdAsync(id);
		if (result == null)
			return NotFound();

		return Ok(result);
	}

	[HttpPost]
	public async Task<IActionResult> Create(Product product)
	{
		await _repository.CreateAsync(product);

		return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(string id)
	{
		var product = await _repository.GetByIdAsync(id);
		if (product == null)
			return NotFound();

		await _repository.DeleteAsync(id);
		return NoContent();
	}
}
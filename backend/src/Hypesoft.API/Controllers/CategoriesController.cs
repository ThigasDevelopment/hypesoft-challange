using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

using Microsoft.AspNetCore.Mvc;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
	private readonly ICategoryRepository _repository;

	public CategoriesController(ICategoryRepository repository)
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
	public async Task<IActionResult> Create(Category category)
	{
		await _repository.CreateAsync(category);

		return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(string id)
	{
		var category = await _repository.GetByIdAsync(id);
		if (category == null)
			return NotFound();

		await _repository.DeleteAsync(id);
		return NoContent();
	}
}
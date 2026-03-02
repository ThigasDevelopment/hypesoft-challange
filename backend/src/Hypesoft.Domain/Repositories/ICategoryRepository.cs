using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories
{
	public interface ICategoryRepository
	{
		Task<List<Category>> GetAllAsync();
		Task<Category?> GetByIdAsync(string id);
		Task<Category?> GetByNameAsync(string name);

		Task CreateAsync(Category category);
		Task DeleteAsync(string id);
	}
}
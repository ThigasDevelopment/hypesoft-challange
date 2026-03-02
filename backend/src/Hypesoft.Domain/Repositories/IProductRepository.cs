using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories
{
	public interface IProductRepository
	{
		Task<List<Product>> GetAllAsync();
		Task<Product?> GetByIdAsync(string id);
		Task<Product?> GetByNameAsync(string name);

		Task CreateAsync(Product product);
		Task UpdateAsync(string id, Product product);
		Task DeleteAsync(string id);
	}
}
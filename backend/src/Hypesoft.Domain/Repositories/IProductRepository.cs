using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories
{
	public interface IProductRepository
	{
		Task<List<Product>> GetAllAsync();
		Task<List<Product>> GetByCategoryIdAsync(string categoryId);
		Task<Product?> GetByIdAsync(string id);

		Task CreateAsync(Product product);
		Task UpdateAsync(string id, Product product);
		Task DeleteAsync(string id);
	}
}
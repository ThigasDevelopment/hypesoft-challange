using MongoDB.Driver;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
	private readonly IMongoCollection<Product> _collection;

	public ProductRepository(IMongoDatabase database)
	{
		_collection = database.GetCollection<Product>("Products");
	}

	public async Task<List<Product>> GetAllAsync() => await _collection.Find(_ => true).ToListAsync();
	public async Task<List<Product>> GetByCategoryIdAsync(string categoryId) => await _collection.Find(p => p.CategoryId == categoryId).ToListAsync();
	public async Task<Product?> GetByIdAsync(string id) => await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();

	public async Task CreateAsync(Product product) => await _collection.InsertOneAsync(product);
	public async Task DeleteAsync(string id) => await _collection.DeleteOneAsync(p => p.Id == id);
	public async Task UpdateAsync(string id, Product product) => await _collection.ReplaceOneAsync(p => p.Id == id, product);
}
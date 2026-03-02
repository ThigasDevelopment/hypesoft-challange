using MongoDB.Driver;

using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
	private readonly IMongoCollection<Category> _collection;

	public CategoryRepository(IMongoDatabase database)
	{
		_collection = database.GetCollection<Category>("Categories");
	}

	public async Task<List<Category>> GetAllAsync() => await _collection.Find(_ => true).ToListAsync();
	public async Task<Category?> GetByIdAsync(string id) => await _collection.Find(c => c.Id == id).FirstOrDefaultAsync();
	public async Task<Category?> GetByNameAsync(string name) => await _collection.Find(c => c.Name == name).FirstOrDefaultAsync();
	public async Task CreateAsync(Category category) => await _collection.InsertOneAsync(category);
	public async Task DeleteAsync(string id) => await _collection.DeleteOneAsync(c => c.Id == id);
}
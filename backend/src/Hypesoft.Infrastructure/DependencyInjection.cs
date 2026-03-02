using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Repositories;

using MongoDB.Driver;

namespace Hypesoft.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure (this IServiceCollection services, IConfiguration configuration)
	{
		var connection = Environment.GetEnvironmentVariable("MONGO_CONNECTION");
		var database = Environment.GetEnvironmentVariable("MONGO_DATABASE");

		services.AddScoped<IMongoDatabase>(service =>
		{
			var client = new MongoClient(connection);
			return client.GetDatabase(database);
		});
		
		services.AddScoped<ICategoryRepository, CategoryRepository>();
		services.AddScoped<IProductRepository, ProductRepository>();

		return services;
	}
}
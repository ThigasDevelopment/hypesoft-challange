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
		var settings = configuration.GetSection ("MongoDBSettings");

		var connection = settings["ConnectionString"];
		var database = settings["Database"];

		services.AddSingleton<IMongoClient> (new MongoClient (connection));
		services.AddScoped<IMongoDatabase> (service =>
		{
			var client = service.GetRequiredService<IMongoClient> ();
			return client.GetDatabase (database);
		});
		
		services.AddScoped<ICategoryRepository, CategoryRepository>();
		services.AddScoped<IProductRepository, ProductRepository>();

		return services;
	}
}
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using Hypesoft.Application;
using Hypesoft.Application.Behaviors;
using Hypesoft.Application.Commands;
using Hypesoft.Application.Validators;
using Hypesoft.Domain;
using Hypesoft.Infrastructure;

using FluentValidation;
using MediatR;

using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateCategoryCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateProductCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<DeleteProductCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UpdateProductCommandHandler>());

builder.Services.AddValidatorsFromAssembly(typeof(CreateProductCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssembly(typeof(CreateCategoryCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssembly(typeof(UpdateProductCommandValidator).Assembly);

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddCors (options =>
{
    options.AddPolicy ("AllowAll", police =>
    {
        police.AllowAnyOrigin ()
              .AllowAnyMethod ()
              .AllowAnyHeader ();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var keycloak = builder.Configuration.GetSection("Keycloak");
    options.Authority = keycloak["Authority"];
    options.Audience = keycloak["Audience"];
    options.RequireHttpsMetadata = bool.Parse(keycloak["RequireHttpsMetadata"] ?? "true");

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,  
    };
});

builder.Services.AddRateLimiter (options =>
{
   options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

   options.AddFixedWindowLimiter ("fixed", limiter =>
   {
        limiter.PermitLimit = 100;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiter.QueueLimit = 2;
   });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<Hypesoft.API.Middlewares.RequestLoggingMiddleware>();
app.MapControllers().RequireRateLimiting("fixed");

app.Run();
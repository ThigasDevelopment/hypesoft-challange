using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using Hypesoft.API.Middlewares;

using Hypesoft.Application;
using Hypesoft.Application.Behaviors;
using Hypesoft.Application.Commands;
using Hypesoft.Application.Validators;

using Hypesoft.Domain;

using Hypesoft.Infrastructure;

using FluentValidation;
using MediatR;

using DotNetEnv;

using System.Threading.RateLimiting;

Env.Load("../../../.env");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateCategoryCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<DeleteCategoryCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateProductCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<DeleteProductCommandHandler>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UpdateProductCommandHandler>());

builder.Services.AddValidatorsFromAssembly(typeof(CreateProductCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssembly(typeof(CreateCategoryCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssembly(typeof(UpdateProductCommandValidator).Assembly);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

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
    var keycloakUrl = Environment.GetEnvironmentVariable("KEYCLOAK_URL") ?? "http://localhost:8080";
    var keycloakInternalUrl = Environment.GetEnvironmentVariable("KEYCLOAK_INTERNAL_URL") ?? "http://hypesoft_keycloak:8080";
    var realm = Environment.GetEnvironmentVariable("KEYCLOAK_REALM") ?? "hypesoft-realm";

    options.Authority = $"{keycloakUrl}/realms/{realm}";
    options.MetadataAddress = $"{keycloakInternalUrl}/realms/{realm}/.well-known/openid-configuration";
    options.Audience = Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_ID");
    options.RequireHttpsMetadata = false;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false,
        ValidateIssuer = true,
        ValidIssuers = [options.Authority, $"{keycloakInternalUrl}/realms/{realm}"],
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
app.UseMiddleware<RequestLoggingMiddleware>();
app.MapControllers().RequireRateLimiting("fixed");
app.UseExceptionHandler(); 

app.Run();
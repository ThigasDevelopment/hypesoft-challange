using Microsoft.AspNetCore.RateLimiting;

// using Hypesoft.Application;
using Hypesoft.Domain;
using Hypesoft.Infrastructure;

using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddCors (options =>
{
    options.AddPolicy ("AllowAll", police =>
    {
        police.AllowAnyOrigin ()
              .AllowAnyMethod ()
              .AllowAnyHeader ();
    });
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
app.UseAuthorization();
app.MapControllers().RequireRateLimiting("fixed");

app.Run();
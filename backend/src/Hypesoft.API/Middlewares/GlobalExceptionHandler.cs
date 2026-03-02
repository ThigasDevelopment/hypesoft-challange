using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

using FluentValidation;

namespace Hypesoft.API.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
	private readonly ILogger<GlobalExceptionHandler> _logger;

	public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
	{
		_logger = logger;
	}

	public async ValueTask<bool> TryHandleAsync (HttpContext context, Exception exception, CancellationToken token)
	{
		_logger.LogError(exception, "An unhandled exception occurred.");

		var details = new ProblemDetails
		{
			Instance = context.Request.Path
		};

		if (exception is ValidationException validation)
		{
			context.Response.StatusCode = StatusCodes.Status400BadRequest;

			details.Title = "Validation Failed";
			details.Status = StatusCodes.Status400BadRequest;
			details.Detail = "One or more validation errors occurred.";

			details.Extensions["errors"] = validation.Errors.Select (e => new { Field = e.PropertyName, Message = e.ErrorMessage });
		} 
		else
		{
			context.Response.StatusCode = StatusCodes.Status500InternalServerError;

			details.Title = "Internal Server Error";
			details.Status = StatusCodes.Status500InternalServerError;
			details.Detail = "An internal server error occurred.";
		}

		await context.Response.WriteAsJsonAsync(details, cancellationToken: token);
		return true;
	}
}
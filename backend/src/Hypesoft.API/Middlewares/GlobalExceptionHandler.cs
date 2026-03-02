using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

using Hypesoft.Domain.Exceptions;

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
		var details = new ProblemDetails
		{
			Instance = context.Request.Path
		};

		if (exception is ValidationException validation)
		{
			_logger.LogWarning("Validation failed: {Message}", validation.Message);

			context.Response.StatusCode = StatusCodes.Status400BadRequest;

			details.Title = "Validation Failed";
			details.Status = StatusCodes.Status400BadRequest;
			details.Detail = "One or more validation errors occurred.";

			details.Extensions["errors"] = validation.Errors.Select (e => new { Field = e.PropertyName, Message = e.ErrorMessage });
		} 
		else if (exception is ConflictException conflict)
		{
			_logger.LogWarning("Conflict error: {Message}", conflict.Message);

			context.Response.StatusCode = StatusCodes.Status409Conflict;

			details.Title = "Conflict";
			details.Status = StatusCodes.Status409Conflict;
			details.Detail = conflict.Message;
		}
		else
		{
			_logger.LogError(exception, "An unhandled exception occurred.");

			context.Response.StatusCode = StatusCodes.Status500InternalServerError;

			details.Title = "Internal Server Error";
			details.Status = StatusCodes.Status500InternalServerError;
			details.Detail = "An internal server error occurred.";
		}

		await context.Response.WriteAsJsonAsync(details, cancellationToken: token);
		return true;
	}
}
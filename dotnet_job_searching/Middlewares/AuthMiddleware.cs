using job_searching.Repositories;

namespace job_searching.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        
        public AuthMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context, ITokenRepository tokenRepository)
        {
            var executingEndpoint = context.GetEndpoint();
            var attributes = executingEndpoint?.Metadata.OfType<AuthorizeAttribute>();
            if (attributes is not null && attributes.Any()) 
            {
                var token = context.Request.Headers["Authorization"];
                var tokenModel = tokenRepository.GetToken(token);
                if (tokenModel is null)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token is invalid");
                }
                else
                {
                    await _next.Invoke(context);
                }
            } 
            else
            {
                await _next.Invoke(context);
            }
            
        }
    }
}

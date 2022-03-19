using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;


namespace job_searching.Controllers
{
    [Route("api")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenRepository tokenRepository;
		public TokenController(ITokenRepository tokenRepository) 
		{
			this.tokenRepository = tokenRepository;
		}

        [HttpPost("login")]
        public void PostLogin([FromBody]String token) 
        {
            if (ModelState.IsValid)
                tokenRepository.CreateToken(token);
        }

        [Authorize]
        [HttpDelete("logout")]
        public void Logout([FromBody]AccessToken token) 
        {
            if (ModelState.IsValid)
                tokenRepository.DeleteToken(token);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using System.Security.Cryptography;

using job_searching.Repositories;
using job_searching.Requests;

namespace job_searching.Controllers
{
    [Route("api")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenRepository tokenRepository;
        private readonly IUserRepository userRepository;
		public TokenController(ITokenRepository tokenRepository, IUserRepository userRepository) 
		{
			this.tokenRepository = tokenRepository;
            this.userRepository = userRepository;
		}

        [HttpPost("login")]
        public ActionResult<string> PostLogin([FromBody] AuthRequest request) 
        {
            if (ModelState.IsValid) {
                String email = request.Email;
                Task<User?> user = userRepository.Get(email);
                if (user is null)
                {
                    return Unauthorized("user is null");
                }
                string generatedToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(18));
                AccessToken token = new AccessToken
                {
                    UserId = user.Id,
                    Token = generatedToken,
                    CreatedAt = DateTime.Now,
                };
                tokenRepository.CreateToken(token);
                return Ok(token);
            }
            return Unauthorized("form is not valid");
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
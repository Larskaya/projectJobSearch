using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;
using job_searching.Services;
using job_searching.Requests;


namespace job_searching.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
		private readonly UserService userService;
		public UserController(IUserRepository userRepository, UserService userService) 
		{
			this.userRepository = userRepository;
			this.userService = userService;
		}

		[HttpPost("register")]
		public async Task<ActionResult> PostRegister([FromBody]User user) 
		{
			if (ModelState.IsValid) 
			{
				RegisterRequest registerRequest = new RegisterRequest();
				int answer = await userService.Register(registerRequest);
				if (answer == 200)
				{
					await userRepository.Create(user);
					return Ok();
				}
				else
				{
					return Forbid();
				}
			}
			else
			{
				return Forbid();
			}
		}
    }
}
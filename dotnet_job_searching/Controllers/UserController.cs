using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;


namespace job_searching.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
		public UserController(IUserRepository userRepository) 
		{
			this.userRepository = userRepository;
		}

		[HttpPost("register")]
		public ActionResult PostRegister([FromBody]User user) 
		{
			if (ModelState.IsValid) 
			{
				userRepository.Create(user);
				return Ok();
			}
			else
			{
				return Forbid();
			}
		}

		
    }

}
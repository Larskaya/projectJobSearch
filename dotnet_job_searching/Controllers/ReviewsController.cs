using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;

namespace job_searching.Controllers
{
    [Route("api/vacancies/{vacancyId}/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository reviewRepository;
		public ReviewsController(IReviewRepository reviewRepository) 
		{
			this.reviewRepository = reviewRepository;
		}

		[Authorize]
		[HttpGet]
		public Task<IEnumerable<Review>> Get(int vacancyId)
		{
			return reviewRepository.GetAllById(vacancyId);
		}

        [Authorize]
		[HttpPost]
		public void Post([FromBody]Review review) 
		{
			if (ModelState.IsValid)
				reviewRepository.Create(review);
		}
    }
}
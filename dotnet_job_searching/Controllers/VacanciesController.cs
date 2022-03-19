using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;


namespace job_searching.Controllers
{
	[Route("/api/vacancies")]
	[ApiController]
	public class VacanciesController : ControllerBase
	{
		private readonly IVacancyRepository vacancyRepository;
		public VacanciesController(IVacancyRepository vacancyRepository) 
		{
			this.vacancyRepository = vacancyRepository;
		}

		[Authorize]
		[HttpGet]
		public IEnumerable<Vacancy> Get()
		{
			return vacancyRepository.GetAll();
		}

		[Authorize]
		[HttpGet("{id}")]
		public Vacancy? Get(int id) 
		{
			return vacancyRepository.GetById(id);
		} 

		[Authorize]
		[HttpPost]
		public void Post([FromBody]Vacancy vacancy) 
		{
			if (ModelState.IsValid)
				vacancyRepository.Add(vacancy);
		}

		[Authorize]
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]Vacancy vacancy) 
		{
			vacancy.Id = id;
			if (ModelState.IsValid)
			{
				vacancyRepository.Update(vacancy);
			}
		}
	}
}
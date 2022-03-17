using Microsoft.AspNetCore.Mvc;
using job_searching.Models;

using job_searching.Repositories;


namespace job_searching.Controllers
{
	[Route("vacancies")]
	[ApiController]
	public class VacanciesController : ControllerBase
	{
		private readonly VacancyRepository vacancyRepository;
		public VacanciesController() 
		{
			vacancyRepository = new VacancyRepository(new PostgresContext());
		}

		[HttpGet]
		public IEnumerable<Vacancy> Get()
		{
			return vacancyRepository.GetAll();
		}

		[HttpGet("{id}")]
		public Vacancy? Get(int id) 
		{
			return vacancyRepository.GetById(id);
		} 

		[HttpPost]
		public void Post([FromBody]Vacancy vacancy) 
		{
			if (ModelState.IsValid)
				vacancyRepository.Add(vacancy);
		}

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
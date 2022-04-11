using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IVacancyRepository
    {
        Task Create(Vacancy vacancy);
        Task<Vacancy?> GetById(int id);
        Task<IEnumerable<Vacancy>> GetAll();
        Task Update(Vacancy vacancy);

        Task DeleteById(int id);
    }
}

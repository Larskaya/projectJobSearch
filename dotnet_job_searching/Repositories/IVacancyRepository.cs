using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IVacancyRepository
    {
        void Add(Vacancy vacancy);
        Vacancy? GetById(int id);
        IEnumerable<Vacancy> GetAll();
        void Update(Vacancy vacancy);

        void DeleteById(int id);
    }
}

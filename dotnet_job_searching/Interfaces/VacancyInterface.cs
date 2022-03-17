using job_searching.Models;

namespace job_searching.Interfaces
{
    public interface IVacancyRepository
    {
        void Create(Vacancy vacancy);
        Vacancy Get(int id);
        List<Vacancy> GetVacancy();
        void Update(Vacancy vacancy);
    }
}

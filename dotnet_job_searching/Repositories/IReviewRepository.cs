using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetAllById(int id);
        Task Create(Review review);
    }
}
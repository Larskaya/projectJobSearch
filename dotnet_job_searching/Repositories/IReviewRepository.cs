using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IReviewRepository
    {
        IEnumerable<Review> GetAllById(int id);
        void Create(Review review);
    }
}
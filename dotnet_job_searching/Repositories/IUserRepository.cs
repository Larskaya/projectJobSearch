using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IUserRepository
    {
        Task Create(User user);
        Task<User?> Get(string login);
    }
}
using job_searching.Models;

namespace job_searching.Repositories
{
    public interface IUserRepository
    {
        void Create(User user);
        
    }
}
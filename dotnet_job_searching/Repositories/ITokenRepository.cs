using job_searching.Models;

namespace job_searching.Repositories
{
    public interface ITokenRepository
    {
        Task<AccessToken?> GetToken(string token);
        Task CreateToken(AccessToken token);
        Task DeleteToken(AccessToken token);
    }
}
using job_searching.Models;

namespace job_searching.Repositories
{
    public interface ITokenRepository
    {
        AccessToken? GetToken(string token);
        void CreateToken(string token);
        void DeleteToken(AccessToken token);
    }
}
using job_searching.Models;

namespace job_searching.Repositories
{
    public interface ITokenRepository
    {
        AccessToken? GetToken(String token);
        void CreateToken(String token);
        void DeleteToken(AccessToken token);
    }
}
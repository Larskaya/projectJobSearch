using Dapper;
using System.Data;

using job_searching.Models;

namespace job_searching.Repositories;
public class PostgresTokenRepository : ITokenRepository
{
    private PostgresContext postgresContext;
    
    public PostgresTokenRepository(PostgresContext postgresContext)
    {
        this.postgresContext = postgresContext;
    }

    public Task CreateToken(AccessToken token)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"INSERT INTO access_tokens (user_id, token, created_at) values (@UserId, @Token, @CreatedAt)";
            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, token);
        }
    }

    public Task<AccessToken?> GetToken(String token)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM access_tokens WHERE token = @Token";
            dbConnection.Open();
            return dbConnection.QuerySingleOrDefaultAsync<AccessToken?>(sQuery, new {Token = token});
        }
    }

    public Task DeleteToken(AccessToken token)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"DELETE FROM access_tokens WHERE token = @Token";
            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, new {Token = token});
        }
    }

}
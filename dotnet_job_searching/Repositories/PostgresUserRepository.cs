using Dapper;
using System.Data;

using job_searching.Models;

namespace job_searching.Repositories;

public class PostgresUserRepository : IUserRepository
{
    private PostgresContext postgresContext;
    
    public PostgresUserRepository(PostgresContext postgresContext)
    {
        this.postgresContext = postgresContext;
    }

    public Task Create(User user)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"INSERT INTO users (password, login, email, type) values (@Password, @Login, @Email, @Type)";

            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, user);
        }
    }

    public Task<User?> Get(String email)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM users WHERE email = @Email";
            dbConnection.Open();
            return dbConnection.QuerySingleOrDefaultAsync<User?>(sQuery, new {Email = email});
        }

    }
}


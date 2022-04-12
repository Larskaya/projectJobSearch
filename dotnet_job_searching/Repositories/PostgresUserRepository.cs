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
            string sQuery = @"
                INSERT INTO users (
                    password, 
                    login, 
                    email, 
                    type
                ) values (
                    @Password, 
                    @Login, 
                    @Email, 
                    @Type)
            ";

            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, user);
        }
    }

    public Task<User?> Get(string email)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM users WHERE email = @Email";
            dbConnection.Open();
            return dbConnection.QuerySingleOrDefaultAsync<User?>(sQuery, new {Email = email});
        }
    }

    public Task<bool> ExistanceByLogin(string login)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT EXISTS (SELECT 1 FROM users WHERE login = @login)";
            dbConnection.Open();
            return dbConnection.ExecuteScalarAsync<bool>(sQuery, new {login});
        }
    }

    public Task<bool> ExistanceByEmail(string email)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT EXISTS (SELECT 1 FROM users WHERE email = @email)";
            dbConnection.Open();
            return dbConnection.ExecuteScalarAsync<bool>(sQuery, new {email});
        }
    }
}


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

    public void Create(User user)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"INSERT INTO users (password, login, email, type) values (@Password, @Login, @Email, @Type)";

            dbConnection.Open();
            dbConnection.Execute(sQuery, user);
        }
    }

    public User? Get(String email)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM users WHERE email = @Email";
            dbConnection.Open();
            return dbConnection.Query<User>(sQuery, new {Email = email}).FirstOrDefault();
        }

    }
}


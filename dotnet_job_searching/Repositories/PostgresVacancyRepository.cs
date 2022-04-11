using Dapper;
using System.Data;

using job_searching.Models;

namespace job_searching.Repositories;

public class PostgresVacancyRepository : IVacancyRepository
{
    private PostgresContext postgresContext;
    
    public PostgresVacancyRepository(PostgresContext postgresContext)
    {
        this.postgresContext = postgresContext;
    }


    public Task Create(Vacancy vacancy)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"INSERT INTO vacancies (title, description, user_id) VALUES (@Title, @Description, @UserId)";
            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, vacancy);
        }
    }

    public Task<IEnumerable<Vacancy>> GetAll() 
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM vacancies";
            dbConnection.Open();
            return dbConnection.QueryAsync<Vacancy>(sQuery);
        }
    }

    public Task<Vacancy?> GetById(int id) 
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM vacancies WHERE id=@Id";
            dbConnection.Open();
            return dbConnection.QuerySingleOrDefaultAsync<Vacancy?>(sQuery, new {Id = id});
        }
    }

    public Task DeleteById(int id) 
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"DELETE * FROM vacancies WHERE id=@Id";
            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, new {Id = id});
        }
    }

    public Task Update(Vacancy vacancy) 
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"UPDATE vacancies SET title=@Title, description=@Description FROM vacancies WHERE id=@d";
            dbConnection.Open();
            return dbConnection.ExecuteAsync(sQuery, vacancy);
        }
    }

    public Vacancy Get(int id)
    {
        throw new NotImplementedException();
    }

    public List<Vacancy> GetVacancies()
    {
        throw new NotImplementedException();
    }
}


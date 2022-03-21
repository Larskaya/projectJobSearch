using Dapper;
using System.Data;

using job_searching.Models;

namespace job_searching.Repositories;
public class PostgresReviewRepository : IReviewRepository
{
    private PostgresContext postgresContext;
    public PostgresReviewRepository(PostgresContext postgresContext)
    {
        this.postgresContext = postgresContext;
    }

    public void Create(Review review)
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"INSERT INTO reviews (id, description, vacancy_id, user_id, created_at) VALUES (@Id, @Description, @VacancyId, @UserId, @CreatedAt)";
            dbConnection.Open();
            dbConnection.Execute(sQuery, review);
        }
    }

    public IEnumerable<Review> GetAllById(int id) 
    {
        using (IDbConnection dbConnection = postgresContext.Connection)
        {
            string sQuery = @"SELECT * FROM reviews WHERE vacancy_id=@Id";
            dbConnection.Open();
            return dbConnection.Query<Review>(sQuery, new {Id = id});
        }
    }
}
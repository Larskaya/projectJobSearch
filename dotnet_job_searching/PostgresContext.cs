using Npgsql;
using System.Data;

namespace job_searching;
public class PostgresContext
{
    private string connectionString;
    public PostgresContext() 
    {
        var connectionStringBuilder = new NpgsqlConnectionStringBuilder();
        connectionStringBuilder.Host = "localhost";
        connectionStringBuilder.Port = 5431;
        connectionStringBuilder.Database = "job_searching";
        
        connectionString = connectionStringBuilder.ToString();
    }

    public IDbConnection Connection => new NpgsqlConnection(connectionString);
}

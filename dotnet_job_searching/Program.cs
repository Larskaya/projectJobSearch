
using job_searching;
using job_searching.Middlewares;
using job_searching.Repositories;

using job_searching.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PostgresContext>();

builder.Services.AddScoped<IUserRepository, PostgresUserRepository>();
builder.Services.AddScoped<IVacancyRepository, PostgresVacancyRepository>();
builder.Services.AddScoped<ITokenRepository, PostgresTokenRepository>();
builder.Services.AddScoped<IReviewRepository, PostgresReviewRepository>();

builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<AuthMiddleware>();

app.MapControllers();

app.Run();


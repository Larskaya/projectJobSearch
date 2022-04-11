namespace job_searching.Models
{
	public record Vacancy
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public int UserId { get; set; }
	}
}


namespace job_searching.Models
{
	public record User
	{
		public int Id { get; set; }
		public string Password { get; set; } = string.Empty;
		public string Login { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
		public int Type { get; set; }
	}
}

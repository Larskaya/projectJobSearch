namespace job_searching.Models
{
    public record AccessToken
    {
        public int UserId { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
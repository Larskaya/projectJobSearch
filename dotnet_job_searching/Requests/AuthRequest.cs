namespace job_searching.Requests
{
    public record AuthRequest
    {
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }
}
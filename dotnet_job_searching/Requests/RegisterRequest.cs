using System.ComponentModel.DataAnnotations;

namespace job_searching.Requests
{
    public record RegisterRequest
    {
        public string Login { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;

        public int Type { get; set; }
    }
}
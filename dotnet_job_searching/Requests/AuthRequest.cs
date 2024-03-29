using System.ComponentModel.DataAnnotations;

namespace job_searching.Requests
{
    public record AuthRequest
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;
    }
}
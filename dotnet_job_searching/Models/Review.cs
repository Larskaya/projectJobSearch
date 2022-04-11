namespace job_searching.Models
{
    public record Review
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int VacancyId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
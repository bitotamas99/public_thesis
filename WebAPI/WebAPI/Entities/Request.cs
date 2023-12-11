namespace WebAPI.Entities
{
    public class Request
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int InstructorId { get; set; }
        public string StudentName { get; set; } = "";
        public bool Accepted { get; set; }
        public DateTime RequestDate { get; set; }
    }
}

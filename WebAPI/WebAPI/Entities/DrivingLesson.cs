namespace WebAPI.Entities
{
    public class DrivingLesson
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; } = "";
        public int InstructorId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool State { get; set; } = false;
    }
}

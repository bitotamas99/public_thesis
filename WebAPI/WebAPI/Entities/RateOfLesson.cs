namespace WebAPI.Entities
{
    public class RateOfLesson
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string Text { get; set; }
        public int LessonNumber { get; set; }
        public DateTime SelectedDate { get; set; }
        public int InstructorId { get; set; }
        public int StudentId { get; set; }
    }
}

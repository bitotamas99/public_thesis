namespace WebAPI.Entities
{
    public class EmploymentRelationship
    {
        public int DrivingSchoolId { get; set; }
        public int InstructorId { get; set; }
        public DrivingSchool DrivingSchool { get; set;}
        public Instructor Instructor { get; set;}

    }
}

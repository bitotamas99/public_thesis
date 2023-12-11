namespace WebAPI.Entities
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string CarType { get; set; }
        public string City { get; set; }
        public List<EmploymentRelationship> EmploymentRelationship { get; set; }
        public List<Rating> RecivedRatings { get; set; }
        public List<Student> Students { get; set; }
    }
}

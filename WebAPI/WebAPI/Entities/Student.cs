using Microsoft.AspNetCore.Identity;

namespace WebAPI.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

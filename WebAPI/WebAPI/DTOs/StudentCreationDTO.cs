using WebAPI.Entities;

namespace WebAPI.DTOs
{
    public class StudentCreationDTO
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsInstructor { get; set; }
    }
}

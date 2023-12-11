using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class DrivingSchoolDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
        public int Order { get; set; }
    }
}

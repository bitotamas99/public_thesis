using System.ComponentModel.DataAnnotations;

namespace WebAPI.Entities
{
    public class DrivingSchool
    {
        //[Compare] használatos jelszavakhoz regisztrációkor mikor 2x kell megadni

        public int Id { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
    }
}

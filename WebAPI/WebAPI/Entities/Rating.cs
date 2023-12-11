using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Entities
{
    public class Rating
    {
        public int Id { get; set; }

        //oktatási minőség
        public int RateEducationQuality { get; set; }        
        
        //órák gyakorisága
        public int RateFrequencyOfLessons { get; set; }

        //hangnem
        public int RateTone { get; set; }

        //ár
        public int RatePrice { get; set; }

        public string RateText { get; set; }

        public int InstructorId { get; set; }
        public Instructor Instructor { get; set;}
        public int StudentId { get; set; }
        public string StudentName { get; set; }
    }
}

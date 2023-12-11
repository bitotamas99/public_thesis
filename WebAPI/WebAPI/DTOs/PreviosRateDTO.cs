using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class PreviosRateDTO
    {
        [Range(1, 5)]
        public int RateEducationQuality { get; set; }

        //órák gyakorisága
        [Range(1, 5)]
        public int RateFrequencyOfLessons { get; set; }

        //hangnem
        [Range(1, 5)]
        public int RateTone { get; set; }

        //ár
        [Range(1, 5)]
        public int RatePrice { get; set; }
    }
}

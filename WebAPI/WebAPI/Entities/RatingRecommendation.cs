namespace WebAPI.Entities
{
    public class RatingRecommendation
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

        public int StudentId { get; set; }
    }
}

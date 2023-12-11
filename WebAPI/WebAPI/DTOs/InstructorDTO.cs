namespace WebAPI.DTOs
{
    public class InstructorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string CarType { get; set; }
        public string City { get; set; }
        public int StudentVoteRatePrice { get; set; }
        public int StudentVoteRateTone { get; set; }
        public int studentVoteRateFrequencyOfLessons { get; set; }
        public int studentVoteRateEducationQuality { get; set; }

        public int RatingIds { get; set; }
        public List<RatingDTO> Ratings { get; set; }
        public List<DrivingSchoolDTO> DrivingSchools { get; set; }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{

    [Route("api/ratings")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly AppDBContext m_context;

        public RatingController(AppDBContext context)
        {
            m_context = context;
        }

        //To get the all ratings whom's instructor id passed in the parameter
        [HttpGet("{instructorId}/RecivedRatings")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRecivedRatings(int instructorId)
        {
            var rating = await m_context.Rating.Where(r => r.InstructorId == instructorId).ToListAsync();

            return rating;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var instructors = await m_context.Instructor.ToListAsync();

            var student = await m_context.Student.FindAsync(ratingDTO.StudentId);

            var rating = new Rating();

            rating.StudentId = ratingDTO.StudentId;
            rating.StudentName = student.Name;
            rating.InstructorId = ratingDTO.InstructorId;
            rating.RatePrice = ratingDTO.RatePrice;
            rating.RateTone = ratingDTO.RateTone;
            rating.RateEducationQuality = ratingDTO.RateEducationQuality;
            rating.RateFrequencyOfLessons = ratingDTO.RateFrequencyOfLessons;
            rating.RateText = ratingDTO.RateText;
            m_context.Add(rating);

            foreach(var instructor in instructors)
            {
                if(rating.InstructorId == instructor.Id)
                {
                    instructor.RecivedRatings.Add(rating);
                }
            }

            await m_context.SaveChangesAsync();

            return NoContent();
        }



        [HttpPost("RatingRecommendation")]
        public async Task<ActionResult> PostRatingRecommendation([FromBody] RatingRecommendationDTO ratingDTO)
        {

            var rating = new RatingRecommendation();
            rating.RatePrice = ratingDTO.RatePrice;
            rating.RateTone = ratingDTO.RateTone;
            rating.RateEducationQuality = ratingDTO.RateEducationQuality;
            rating.RateFrequencyOfLessons = ratingDTO.RateFrequencyOfLessons;
            rating.StudentId = ratingDTO.StudentId;
            m_context.Add(rating);

            await m_context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Recommendation/{city}/{id}")]
        public async Task<List<Instructor>> GetMostRelevantInstructors(string city, int id)
        {
            var newUserRating = await m_context.RatingRecommendation.Where(x => x.StudentId == id).OrderBy(x => x.Id).LastOrDefaultAsync();

            var instructors = await m_context.Instructor.Include(i => i.RecivedRatings).Where(i => i.RecivedRatings.Count > 0).ToListAsync();

            var instructorRatings = new List<EuclideanInstructorRecommendationHelper>();

            foreach (var instructor in instructors)
            {
                var totalDistance = 0.0;
                foreach (var rating in instructor.RecivedRatings)
                {
                    var distance = Math.Sqrt(
                        Math.Pow(rating.RateEducationQuality - newUserRating.RateEducationQuality, 2) +
                        Math.Pow(rating.RateFrequencyOfLessons - newUserRating.RateFrequencyOfLessons, 2) +
                        Math.Pow(rating.RateTone - newUserRating.RateTone, 2) +
                        Math.Pow(rating.RatePrice - newUserRating.RatePrice, 2)
                    );
                    totalDistance += distance;
                }


                var averageDistance = totalDistance / instructor.RecivedRatings.Count;

                instructorRatings.Add(new EuclideanInstructorRecommendationHelper
                {
                    InstructorId = instructor.Id,
                    Distance = averageDistance
                });
            }

            List<Instructor?> relevantInstructors;

            if (city != "undefined" && city != "Összes")
            {
                relevantInstructors = instructorRatings.OrderBy(ir => ir.Distance)
                                          .Select(ir => instructors.FirstOrDefault(i => i.Id == ir.InstructorId)).Where(i => i.City == city)
                                          .Take(5)
                                          .ToList();
            }
            else
            {
               relevantInstructors = instructorRatings.OrderBy(ir => ir.Distance)
              .Take(5)
              .Select(ir => instructors.FirstOrDefault(i => i.Id == ir.InstructorId))
              .ToList();
            }
            
            return relevantInstructors;
        }

    }
}

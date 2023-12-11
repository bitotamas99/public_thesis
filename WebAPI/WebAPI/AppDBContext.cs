using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Entities;

namespace WebAPI
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // itt mondjuk meg az employmentrelarionship kulcsait, egy anonymus típussal
            modelBuilder.Entity<EmploymentRelationship>().HasKey(x => new { x.DrivingSchoolId, x.InstructorId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<DrivingSchool> DrivingSchool { get; set; }
        public DbSet<Instructor> Instructor { get; set; }
        public DbSet<EmploymentRelationship> EmploymentRelationship { get; set; }

        public DbSet<Student> Student { get; set; }

        public DbSet<Rating> Rating { get; set; }

        public DbSet<RatingRecommendation> RatingRecommendation { get; set; }

        public DbSet<Request> Request { get; set; }

        public DbSet<RateOfLesson> RateOfLesson { get; set; }

        public DbSet<DrivingLesson> DrivingLesson { get; set; }

        public DbSet<Administrator> Administrator { get; set; }
    }
}

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Migrations;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/driving-lessons")]
    [ApiController]
    public class DrivingLessonController : ControllerBase
    {

        private readonly ILogger<DrivingLessonController> m_logger;
        private readonly AppDBContext m_context;
        private readonly IMapper m_mapper;

        public DrivingLessonController(ILogger<DrivingLessonController> logger, AppDBContext context, IMapper mapper)
        {
            m_logger = logger;
            m_context = context;
            m_mapper = mapper;
        }

        //ToCreate driving lesson
        [HttpPost("CreateLesson")]
        public async Task<ActionResult> CreateLesson([FromBody] Entities.DrivingLesson lesson)
        {
            var student = await m_context.Student.FindAsync(lesson.StudentId);

            var existingLessons = await m_context.DrivingLesson
                                                    .Where(l => l.InstructorId == lesson.InstructorId
                                                                && l.State == true)
                                                    .ToListAsync();

            if (existingLessons.Any(l => l.Start <= lesson.End && l.End >= lesson.Start))
            {
                return BadRequest("Óra ütközés!");
            }

            var drivingLesson = new Entities.DrivingLesson();
            drivingLesson.StudentId = lesson.StudentId;
            drivingLesson.StudentName = student.Name;
            drivingLesson.InstructorId = lesson.InstructorId;
            drivingLesson.Start = lesson.Start;
            drivingLesson.End = lesson.End;

            m_context.Add(drivingLesson);

            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //To get all the coming driving lesson reservations:
        [HttpGet("GetLessonReservations")]
        public async Task<ActionResult<IEnumerable<Entities.DrivingLesson>>> GetReservationLessons()
        {
            var lessons = await m_context.DrivingLesson
                                                   .Where(lesson => lesson.State == false)
                                                   .ToListAsync();

            return lessons;
        }

        //To get all the accepted driving lesson reservations:
        [HttpGet("GetAcceptedLessons/{id}")]
        public async Task<ActionResult<IEnumerable<Entities.DrivingLesson>>> GetAcceptedLessons(int id)
        {
            var instructor = await m_context.Instructor.FindAsync(id);

            var lessons = await m_context.DrivingLesson
                                                   .Where(lesson => lesson.State == true && lesson.InstructorId == instructor.Id && lesson.Start > DateTime.Now)
                                                   .ToListAsync();

            return lessons;
        }

        //To get all the accepted driving lesson reservations:
        [HttpGet("GetAcceptedLessonsStudent/{id}")]
        public async Task<ActionResult<IEnumerable<Entities.DrivingLesson>>> GetAcceptedLessonsStudent(int id)
        {
            var student = await m_context.Student.FindAsync(id);

            var lessons = await m_context.DrivingLesson
                                                   .Where(lesson => lesson.State == true && lesson.StudentId == student.Id)
                                                   .ToListAsync();

            return lessons;
        }

        //To get all the accepted lessons from the current student's instructor
        [HttpGet("GetAcceptedLessonsFromInstructor/{id}")]
        public async Task<ActionResult<IEnumerable<Entities.DrivingLesson>>> GetAcceptedLessonsFromInstructor(int id)
        {
            var student = await m_context.Student.FindAsync(id);

            var studentSInstructor = await m_context.Request.Where(x => x.Accepted == true && x.StudentId == id).FirstOrDefaultAsync();

            var lessons = await m_context.DrivingLesson
                                                   .Where(lesson => lesson.State == true && lesson.InstructorId == studentSInstructor.InstructorId && lesson.Start > DateTime.Now)
                                                   .ToListAsync();

            return lessons;
        }

        //To accept a lesson
        [HttpPut("Reservations/{id}/accept")]
        public async Task<ActionResult> AcceptReservation(int id)
        {
            var lesson = await m_context.DrivingLesson.FindAsync(id);

            if (lesson == null)
            {
                return NotFound();
            }

            lesson.State = true;
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //to delete the lesson request
        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> DeleteLessonReservation(int id)
        {
            var lesson = await m_context.DrivingLesson.FindAsync(id);

            if (lesson == null)
            {
                return NotFound();
            }

            m_context.Remove(lesson);
            await m_context.SaveChangesAsync();

            return NoContent();
        }
    }
}

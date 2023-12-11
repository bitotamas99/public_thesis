using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Helpers;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/students")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IConfiguration m_configuration;
        private readonly AppDBContext m_context;
        private readonly IMapper m_mapper;

        public StudentController(
            IConfiguration configuration,
            AppDBContext context,
            IMapper mapper)
        {
            m_configuration = configuration;
            m_context = context;
            m_mapper = mapper;
        }

        //Check if request is accepted
        [HttpGet("{studentId}/GetAcceptedRequest")]
        public async Task<ActionResult<StudentInstructorRelationshipHelper>> GetAcceptedRequest(int studentId)
        {
            var request = await m_context.Request.Where(x => x.StudentId == studentId).FirstOrDefaultAsync();

            if (request != null)
            {
                var instructor = await m_context.Instructor.FindAsync(request.InstructorId);

                var response = new StudentInstructorRelationshipHelper
                {
                    StudentId = studentId,
                    InstructorId = instructor.Id,
                    InstructorName = instructor.Name,
                    IsRequestAccepted = request.Accepted
                };

                return response;
            }
            else
            {
                return NoContent();
            }  
        }

        //Create request
        [HttpPost("SendRequest")]
        public async Task<ActionResult> PostRequest([FromBody] Request request)
        {
            var existingRequest = await m_context.Request.FirstOrDefaultAsync(r =>
                r.StudentId == request.StudentId && r.InstructorId == request.InstructorId);

            if (existingRequest != null)
            {
                return BadRequest("The student has already sent a request to this instructor.");
            }

            var student = await m_context.Student.FindAsync(request.StudentId);

            var newRequest = new Request
            {
                StudentId = request.StudentId,
                InstructorId = request.InstructorId,
                RequestDate = DateTime.Now,
                StudentName = student.Name,
                Accepted = false
            };

            m_context.Request.Add(newRequest);
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //Get student by id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<StudentDTO>> Get(int id)
        {
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromForm] LoginViewModel loginViewModel)
        {
            String password = Password.hashPassword(loginViewModel.Password);

            var dbUser = await m_context.Student.Where(x => x.Username == loginViewModel.Username && x.Password == password).FirstOrDefaultAsync();

            if (dbUser == null)
            {
                return BadRequest("Felhasználónév vagy jelszó helytelen.");
            }

            var authClaims = new List<Claim>{
                new Claim(ClaimTypes.Name, dbUser.Username),
                new Claim("userId", dbUser.Id.ToString()),
                new Claim("role", "student")
            };

            var token = getToken(authClaims);

            return Ok(new
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            });
        }

        [HttpPost("Create")]
        public async Task<ActionResult> Post([FromForm] StudentCreationDTO studentCreationDTO)
        {
            String password = Password.hashPassword(studentCreationDTO.Password);

            var newStudent = await m_context.Student.Where(x => x.Username == studentCreationDTO.Username && x.Password == password).FirstOrDefaultAsync();

            if (newStudent != null)
            {
                return BadRequest("user already exist!");
            }

            studentCreationDTO.Password = Password.hashPassword(studentCreationDTO.Password);

            newStudent = m_mapper.Map<Student>(studentCreationDTO);

            m_context.Add(newStudent);

            await m_context.SaveChangesAsync();

            return NoContent();
        }
        

        //To get the all the rates of lessons
        [HttpGet("{studentId}/GetAllRateOfLessons")]
        public async Task<List<RateOfLesson>> GetAllRateOfLesson(int studentId)
        {
            var allRatesOfLesson = await m_context.RateOfLesson.Where(x => x.StudentId == studentId).ToListAsync();

            return allRatesOfLesson;
        }

        private JwtSecurityToken getToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(m_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: m_configuration["JWT:ValidIssuer"], 
                audience: m_configuration["JWT:ValidAudience"], 
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}

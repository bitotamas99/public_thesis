using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/instructors")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private readonly AppDBContext m_context;
        private readonly IConfiguration m_configuration;
        private readonly IMapper m_mapper;

        public InstructorController(AppDBContext context, IConfiguration configuration, IMapper mapper)
        {
            m_context = context;
            m_configuration = configuration;
            m_mapper = mapper;
        }

        //Get instructor by city
        [HttpGet("{city}")]
        public async Task<ActionResult<List<Instructor>>> GetWithCity(string city)
        {
            var instructors = await m_context.Instructor
                .Where(x => x.City == city)
                .OrderBy(x => x.Name)
                .ToListAsync();

            return instructors;
        }

        //Get instructor by id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<InstructorDTO>> Get(int id)
        {
            var instructor = await m_context.Instructor
                .Include(x => x.EmploymentRelationship).ThenInclude(x => x.DrivingSchool)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (instructor == null)
            {
                return NotFound();
            }

            var ratings = await m_context.Rating.Where(r => r.InstructorId == id).ToListAsync();
            
            var ratingDTOs = m_mapper.Map<List<RatingDTO>>(ratings);

            var dto = m_mapper.Map<InstructorDTO>(instructor);

            dto.Ratings = ratingDTOs;

            dto.DrivingSchools = dto.DrivingSchools.OrderBy(x => x.Order).ToList();

            return dto;
        }


        //to list all the requests 
        [HttpGet("{instructorId}/Requests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestsForInstructor(int instructorId)
        {
            var requests = await m_context.Request.Where(r => r.InstructorId == instructorId && !r.Accepted).ToListAsync();
            return requests;
        }

        //to list all the students
        [HttpGet("{instructorId}/StudentRequests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetStudentsRequestsForInstructor(int instructorId)
        {
            var requests = await m_context.Request.Where(r => r.InstructorId == instructorId && r.Accepted).ToListAsync();
            return requests;
        }

        //to accept the request
        [HttpPut("requests/{id}/accept")]
        public async Task<ActionResult> AcceptRequest(int id)
        {
            var request = await m_context.Request.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            request.Accepted = true;
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //to delete the request
        [HttpDelete("requests/{id}/delete")]
        public async Task<ActionResult> DeleteRequest(int id)
        {
            var request = await m_context.Request.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            m_context.Remove(request);
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //Creating instructor
        [HttpPost("Create")]
        public async Task<ActionResult> Post([FromForm]InstructorCreationDTO instructorCreationDTO)
        {
            String password = Password.hashPassword(instructorCreationDTO.Password);

            var instructor = await m_context.Instructor.Where(x => x.Username == instructorCreationDTO.Username && x.Password == password).FirstOrDefaultAsync();

            if (instructor != null)
            {
                return BadRequest("user already exist!");
            }

            instructorCreationDTO.Password = Password.hashPassword(instructorCreationDTO.Password);

            instructor = m_mapper.Map<Instructor>(instructorCreationDTO);

            m_context.Add(instructor);
            
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //to create a rate of lesson
        [HttpPost("RateOfLessons")]
        public async Task<ActionResult> RateOfLesson([FromBody] RateOfLesson rateOfLesson)
        {
            var student = m_context.Student.Where(x => x.Name ==  rateOfLesson.StudentName).FirstOrDefault();

            rateOfLesson.StudentId = student.Id;

            m_context.Add(rateOfLesson);

            await m_context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetDatesToRateLesson")]
        public async Task<ActionResult> GetDatesToRateLesson(string studentName)
        {
            var lessonDates = await m_context.DrivingLesson
                .Where(lesson => lesson.StudentName == studentName)
                .OrderBy(lesson => lesson.Start)
                .Select(lesson => lesson.Start)
                .ToListAsync();

            return Ok(lessonDates);
        }

        //display driving schools to choose form, to create an instructor
        [HttpGet("PostGet")]
        public async Task<ActionResult<InstructorPostGetDTO>> PostGet()
        {
            var drivingSchools = await m_context.DrivingSchool.OrderBy(x => x.Name).ToListAsync();

            var drivingSchoolsDTO = m_mapper.Map<List<DrivingSchoolDTO>>(drivingSchools);

            return new InstructorPostGetDTO{ DrivingSchools = drivingSchoolsDTO };
        }

        //To get current driving schools
        [HttpGet("GetDrivingSchools/{id}")]
        public async Task<ActionResult<List<DrivingSchool>>> GetDrivingSchools(int id)
        {
            List<EmploymentRelationship> employmentRelationships = await m_context.EmploymentRelationship.Where(x => x.InstructorId == id).ToListAsync();

            List<DrivingSchool> drivingSchools = new List<DrivingSchool>();

            foreach (EmploymentRelationship er in employmentRelationships)
            {
                DrivingSchool drivingSchool = await m_context.DrivingSchool.FirstOrDefaultAsync(x => x.Id == er.DrivingSchoolId);
                if (drivingSchool != null)
                {
                    drivingSchools.Add(drivingSchool);
                }
            }

            return drivingSchools;
        }


        [HttpGet]
        public async Task<ActionResult<List<InstructorDTO>>> GetAllInstructors()
        {
            var instructors = await m_context.Instructor.OrderBy(x => x.Name).ToListAsync();

            return m_mapper.Map<List<InstructorDTO>>(instructors);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromForm] LoginViewModel loginViewModel)
        {
            if(loginViewModel.Username != "Admin")
            {
                String password = Password.hashPassword(loginViewModel.Password);

                var dbUser = await m_context.Instructor.Where(x => x.Username == loginViewModel.Username && x.Password == password).FirstOrDefaultAsync();

                if (dbUser == null)
                {
                    return BadRequest("Felhasználónév vagy jelszó helytelen.");
                }

                var authClaims = new List<Claim>{
                new Claim(ClaimTypes.Name, dbUser.Username),
                new Claim("userId", dbUser.Id.ToString()),
                new Claim("role", "instructor")
            };

                var token = getToken(authClaims);

                return Ok(new
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiration = token.ValidTo
                });
            }
            else
            {
                var admin = await m_context.Administrator.Where(x => x.Username == "Admin" && x.Password == "Admin").FirstOrDefaultAsync();

                if (admin == null)
                {
                    return BadRequest("Felhasználónév vagy jelszó helytelen.");
                }

                var authClaims = new List<Claim>
                {
                    new Claim("role", "admin")
                };

                var token = getToken(authClaims);

                return Ok(new
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiration = token.ValidTo
                });
            }
            
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

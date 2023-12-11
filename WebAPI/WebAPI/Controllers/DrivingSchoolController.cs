using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [Route("api/driving-schools")]
    [ApiController]
    public class DrivingSchoolController : ControllerBase
    {
        private readonly ILogger<DrivingSchoolController> m_logger;
        private readonly AppDBContext m_context;
        private readonly IMapper m_mapper;

        public DrivingSchoolController(ILogger<DrivingSchoolController> logger, AppDBContext context, IMapper mapper)
        {
            m_logger = logger;
            m_context = context;
            m_mapper = mapper;
        }

        //To get all driving school
        [HttpGet]
        public async Task<ActionResult<List<DrivingSchoolDTO>>> GetAllDricingSchool()
        {
            var drivingSchools = await m_context.DrivingSchool.OrderBy(x => x.Name).ToListAsync();

            return m_mapper.Map<List<DrivingSchoolDTO>>(drivingSchools);
        }

        //To get driving school by id
        [HttpGet ("{id:int}")]
        public async Task<ActionResult<DrivingSchoolDTO>> GetDrivingSchool(int id) 
        {
            var drivingSchool = await m_context.DrivingSchool.FirstOrDefaultAsync(x => x.Id == id);

            if(drivingSchool == null)
            {
                return NotFound();
            }

            return m_mapper.Map<DrivingSchoolDTO>(drivingSchool);
        }

        //To create driving school
        [HttpPost]
        public async Task<ActionResult> Post(DrivingSchoolCreationDTO drivingSchoolCreationDTO) 
        {
            var drivingSchool = m_mapper.Map<DrivingSchool>(drivingSchoolCreationDTO);

            m_context.Add(drivingSchool);

            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //To edit driving school
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, DrivingSchoolCreationDTO drivingSchoolCreationDTO) 
        {
            var drivingSchool = m_mapper.Map<DrivingSchool>(drivingSchoolCreationDTO);
            drivingSchool.Id = id;
            m_context.Entry(drivingSchool).State = EntityState.Modified;
            await m_context.SaveChangesAsync();

            return NoContent();
        }

        //To delete driving school
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id) 
        {
            var drivingSchool = await m_context.DrivingSchool.FirstOrDefaultAsync(x => x.Id == id);

            if(drivingSchool == null)
            {
                return NotFound();
            }

            m_context.Remove(drivingSchool);

            await m_context.SaveChangesAsync();

            return NoContent();
        }
    }
}

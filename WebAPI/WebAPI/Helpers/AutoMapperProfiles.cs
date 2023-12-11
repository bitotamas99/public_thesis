using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Entities;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DrivingSchoolDTO, DrivingSchool>().ReverseMap();
            CreateMap<DrivingSchoolCreationDTO, DrivingSchool>().ReverseMap();

            CreateMap<RatingDTO, Rating>().ReverseMap();

            CreateMap<InstructorCreationDTO, Instructor>().ForMember(x => x.EmploymentRelationship, options => options.MapFrom(MapEmploymentRelationship));
            CreateMap<Instructor, InstructorDTO>().ForMember(x => x.DrivingSchools, options => options.MapFrom(MapEmploymentRelationship));

            CreateMap<StudentCreationDTO, Student>().ReverseMap();
            CreateMap<StudentDTO, Student>().ReverseMap();
        }

        private List<DrivingSchoolDTO> MapEmploymentRelationship(Instructor instructor, InstructorDTO instructorDTO)
        {
            var result = new List<DrivingSchoolDTO>();

            if (instructor.EmploymentRelationship != null)
            {
                

                foreach(var drivingSchool in instructor.EmploymentRelationship)
                {
                    result.Add(new DrivingSchoolDTO() { Id = drivingSchool.DrivingSchoolId, Name = drivingSchool.DrivingSchool.Name, Website = drivingSchool.DrivingSchool.Website });
                }
                
            }

            return result;
        }
        private List<EmploymentRelationship> MapEmploymentRelationship(InstructorCreationDTO instructorCreationDTO, Instructor instructor)
        {
            var result = new List<EmploymentRelationship>();

            if (instructorCreationDTO.DrivingSchoolIds == null)
            {
                return result;
            }

            foreach (var id in instructorCreationDTO.DrivingSchoolIds)
            {
                result.Add(new EmploymentRelationship() { DrivingSchoolId = id });
            }


            return result;
        }


    }
}

using Microsoft.AspNetCore.Mvc;
using WebAPI.Entities;
using WebAPI.Helpers;

namespace WebAPI.DTOs
{
    public class InstructorCreationDTO
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string CarType { get; set; }
        public string City { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> DrivingSchoolIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>?>))]
        public List<int>? RatingIds { get; set; }
    }
}

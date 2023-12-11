using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class LoginViewModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        //public bool IsInstructor { get; set; }
    }
}

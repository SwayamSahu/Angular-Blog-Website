using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogWebAPI.Models
{
    public class UserRegistration
    {
        [Key]
        public int UserId { get; set; }

      

       

        public string UserName { get; set; }

        public string email { get; set; }

        public string Password { get; set; }



    }
}

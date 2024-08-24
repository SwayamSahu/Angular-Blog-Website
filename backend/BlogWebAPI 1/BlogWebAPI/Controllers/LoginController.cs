//using BlogWebAPI.Data;
//using BlogWebAPI.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace BlogWebAPI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//        private readonly BlogDbContext _context;

//        public LoginController(BlogDbContext context) {
//            _context = context;
//        }


//        [HttpPost]
//        public async Task<IActionResult> Login([FromBody] Login login)
//        {
//            var user = await _context.UserRegistration.FirstOrDefault(u => login.username == u.UserName && login.password == u.Password);

//            return BadRequest();

//        }
//    }
//}
using BlogWebAPI.Data;
using BlogWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public LoginController(BlogDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login login)


        {
            
            if (login == null || string.IsNullOrEmpty(login.username) || string.IsNullOrEmpty(login.password))
            {
                return BadRequest("Invalid username or password.");
            }

            var user = await _context.UserRegistration.FirstOrDefaultAsync(u => u.UserName == login.username && u.Password == login.password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes("qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"); // Replace with your actual secret key
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //    {
            //new Claim(ClaimTypes.Name, user.UserName)
            //    }),
            //    Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //var tokenString = tokenHandler.WriteToken(token);


            /*return Ok(new { Token = tokenString });*/
            return Ok(user);
        }
    }
}

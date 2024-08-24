using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private static List<string> subscribedEmails = new List<string>();
        [HttpPost]
        public IActionResult Subscribe([FromBody] SubscriptionRequest request)
        {
            if (IsEmailSubscribed(request.Email))
            {
                return Conflict($"Email '{request.Email}' is already subscribed.");
            }
            subscribedEmails.Add(request.Email);
            SendConfirmationEmail(request.Email);
            return Ok();
        }
        [HttpGet]
        public bool IsEmailSubscribed(string email)
        {
            return subscribedEmails.Contains(email);
        }
        [NonAction]
        public void SendConfirmationEmail(string email)
        {
            using (var message = new MailMessage())
            {
                message.From = new MailAddress("dev.ashwinalexander@gmail.com");
                message.To.Add(email);
                message.Subject = "Subscription Confirmation";
                message.Body = "Thank you for subscribing!";

                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential("dev.ashwinalexander@gmail.com", "fsqxginpqingrcnn");
                    smtpClient.EnableSsl = true;

                    smtpClient.Send(message);

                }
            }
        }
    }
    public class SubscriptionRequest
    {
        public string Email { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogWebAPI.Models
{
    public class Blogs
    {
        [Key]
        public int BlogId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Categories { get; set; }

        [ForeignKey("UserId")]
        public int UserId {  get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using BlogWebAPI.Models;

namespace BlogWebAPI.Data { 
    public class BlogDbContext:DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options):base(options) { }

        public DbSet<Blogs> Blogs { get; set; }

        public DbSet<UserRegistration> UserRegistration { get; set; }


    }
}

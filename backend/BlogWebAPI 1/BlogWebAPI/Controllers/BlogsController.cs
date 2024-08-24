using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogWebAPI.Data;
using BlogWebAPI.Models;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public BlogsController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blogs>>> GetBlogs()
        {
            return await _context.Blogs.ToListAsync();
        }

        // GET: api/Blogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blogs>> GetBlogs(int id)
        {
            var blogs = await _context.Blogs.FindAsync(id);

            if (blogs == null)
            {
                return NotFound();
            }

            return blogs;
        }

        // PUT: api/Blogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogs(int id, Blogs blogs)
        {
            if (id != blogs.BlogId)
            {
                return BadRequest();
            }

            _context.Entry(blogs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Blogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blogs>> PostBlogs(Blogs blogs)
        {
            _context.Blogs.Add(blogs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogs", new { id = blogs.BlogId }, blogs);
        }
        // GET: api/Blogs/Category/{category}
        [HttpGet("Category/{category}")]
        public async Task<ActionResult<IEnumerable<Blogs>>> GetBlogsByCategory(string category)
        {
            var blogs = await _context.Blogs.Where(b => b.Categories == category).ToListAsync();

            if (!blogs.Any())
            {
                return NotFound();
            }

            return blogs;
        }
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Blogs>>> GetCollectionsByUser(int userId)
        {
            var collections = await _context.Blogs
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (collections == null || collections.Count == 0)
            {
                return NotFound("No collections found for the specified user.");
            }

            return collections;
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogs(int id)
        {
            var blogs = await _context.Blogs.FindAsync(id);
            if (blogs == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blogs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogsExists(int id)
        {
            return _context.Blogs.Any(e => e.BlogId == id);
        }
    }
}

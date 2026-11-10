using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreshCart.Api.Data;
using FreshCart.Api.Models.DTOs;
using FreshCart.Api.Models.Entities;

namespace FreshCart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/wishlist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetWishlist([FromQuery] string userId = "user-1")
        {
            var products = await _context.WishlistItems
                .Where(w => w.UserId == userId)
                .Include(w => w.Product)
                .OrderByDescending(w => w.CreatedAt)
                .Select(w => w.Product!)
                .Where(p => p != null)
                .AsNoTracking()
                .ToListAsync();

            return Ok(products);
        }

        // POST: api/wishlist/toggle
        [HttpPost("toggle")]
        public async Task<ActionResult<WishlistToggleResultDto>> ToggleWishlist([FromBody] WishlistToggleDto dto)
        {
            var userId = string.IsNullOrEmpty(dto.UserId) ? "user-1" : dto.UserId;
            var existing = await _context.WishlistItems
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == dto.ProductId);

            bool inWishlist;
            if (existing != null)
            {
                _context.WishlistItems.Remove(existing);
                inWishlist = false;
            }
            else
            {
                var item = new WishlistItem
                {
                    UserId = userId,
                    ProductId = dto.ProductId,
                    CreatedAt = DateTime.UtcNow
                };
                _context.WishlistItems.Add(item);
                inWishlist = true;
            }

            await _context.SaveChangesAsync();

            var totalCount = await _context.WishlistItems.CountAsync(w => w.UserId == userId);

            return Ok(new WishlistToggleResultDto
            {
                InWishlist = inWishlist,
                ProductId = dto.ProductId,
                TotalCount = totalCount
            });
        }
    }
}

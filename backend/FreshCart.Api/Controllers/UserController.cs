using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreshCart.Api.Data;
using FreshCart.Api.Models.DTOs;
using FreshCart.Api.Models.Entities;

namespace FreshCart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/user/profile
        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile([FromQuery] string userId = "user-1")
        {
            var user = await _context.Users
                .Include(u => u.Addresses)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound(new { message = $"User '{userId}' was not found." });
            }

            return Ok(user);
        }

        // PUT: api/user/profile
        [HttpPut("profile")]
        public async Task<ActionResult<User>> UpdateProfile([FromBody] ProfileUpdateDto dto, [FromQuery] string userId = "user-1")
        {
            var user = await _context.Users
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound(new { message = $"User '{userId}' was not found." });
            }

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.AvatarColor = dto.AvatarColor;
            user.DietaryPreference = dto.DietaryPreference;
            user.DeliveryInstruction = dto.DeliveryInstruction;

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // GET: api/user/addresses
        [HttpGet("addresses")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses([FromQuery] string userId = "user-1")
        {
            var addresses = await _context.Addresses
                .AsNoTracking()
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return Ok(addresses);
        }

        // POST: api/user/addresses
        [HttpPost("addresses")]
        public async Task<ActionResult<Address>> AddAddress([FromBody] AddressCreateDto dto, [FromQuery] string userId = "user-1")
        {
            if (dto.IsDefault)
            {
                var existingDefaults = await _context.Addresses
                    .Where(a => a.UserId == userId && a.IsDefault)
                    .ToListAsync();

                foreach (var addr in existingDefaults)
                {
                    addr.IsDefault = false;
                }
            }

            var address = new Address
            {
                Id = $"addr-{Guid.NewGuid():N}"[..10],
                UserId = userId,
                Label = dto.Label,
                AddressLine = dto.AddressLine,
                City = dto.City,
                ZipCode = dto.ZipCode,
                IsDefault = dto.IsDefault,
                EstimatedMinutes = dto.EstimatedMinutes
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return Ok(address);
        }
    }
}

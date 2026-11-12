using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreshCart.Api.Data;
using FreshCart.Api.Models.DTOs;
using FreshCart.Api.Models.Entities;

namespace FreshCart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] string? userId = "user-1")
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .AsNoTracking()
                .Where(o => string.IsNullOrEmpty(userId) || o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = $"Order '{id}' not found." });
            }

            return Ok(order);
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] OrderCreateDto dto)
        {
            if (dto.Items == null || !dto.Items.Any())
            {
                return BadRequest(new { message = "Cannot place an order with an empty cart." });
            }

            decimal subtotal = dto.Items.Sum(i => i.Price * i.Quantity);
            decimal discountAmount = 0m;

            if (!string.IsNullOrWhiteSpace(dto.PromoCode))
            {
                var coupon = await _context.Coupons
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Code.ToUpper() == dto.PromoCode.Trim().ToUpper() && c.IsActive);

                if (coupon != null && subtotal >= coupon.MinOrderAmount)
                {
                    if (coupon.DiscountType.Equals("percentage", StringComparison.OrdinalIgnoreCase))
                    {
                        discountAmount = Math.Round(subtotal * (coupon.DiscountValue / 100m), 2);
                    }
                    else
                    {
                        discountAmount = coupon.DiscountValue;
                    }
                }
            }

            // Free delivery threshold ₹499 (matches frontend rules)
            decimal deliveryFee = subtotal >= 499m ? 0m : 40m;
            decimal grandTotal = Math.Max(0m, subtotal - discountAmount + deliveryFee);

            var randomNum = new Random().Next(100000, 999999);
            var orderId = $"FC-IN-{randomNum}";

            var order = new Order
            {
                Id = orderId,
                UserId = dto.UserId ?? "user-1",
                CreatedAt = DateTime.UtcNow,
                Status = "Placed",
                SlotLabel = dto.SlotLabel,
                SlotTime = dto.SlotTime,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                DiscountAmount = discountAmount,
                PromoCode = string.IsNullOrWhiteSpace(dto.PromoCode) ? null : dto.PromoCode.Trim().ToUpper(),
                Taxes = 0m,
                GrandTotal = grandTotal,
                PaymentMethod = dto.PaymentMethod,
                DeliveryAddressJson = JsonSerializer.Serialize(dto.DeliveryAddress),
                Items = dto.Items.Select(item => new OrderItem
                {
                    OrderId = orderId,
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    WeightOption = item.WeightOption,
                    ImageUrl = item.ImageUrl
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
    }
}


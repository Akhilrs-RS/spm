using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreshCart.Api.Data;
using FreshCart.Api.Models.DTOs;

namespace FreshCart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CouponsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/coupons/validate
        [HttpPost("validate")]
        public async Task<ActionResult<CouponResultDto>> ValidateCoupon([FromBody] CouponValidateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Code))
            {
                return BadRequest(new CouponResultDto
                {
                    IsValid = false,
                    Message = "Please provide a valid coupon code."
                });
            }

            var cleanCode = dto.Code.Trim().ToUpper();
            var coupon = await _context.Coupons
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Code.ToUpper() == cleanCode && c.IsActive);

            if (coupon == null)
            {
                return Ok(new CouponResultDto
                {
                    IsValid = false,
                    Code = cleanCode,
                    Message = $"Coupon '{cleanCode}' is invalid or expired."
                });
            }

            if (dto.Subtotal < coupon.MinOrderAmount)
            {
                return Ok(new CouponResultDto
                {
                    IsValid = false,
                    Code = cleanCode,
                    Message = $"Coupon '{cleanCode}' requires a minimum order of ₹{coupon.MinOrderAmount}."
                });
            }

            decimal discountAmount;
            if (coupon.DiscountType.Equals("percentage", StringComparison.OrdinalIgnoreCase))
            {
                discountAmount = Math.Round(dto.Subtotal * (coupon.DiscountValue / 100m), 2);
            }
            else
            {
                discountAmount = coupon.DiscountValue;
            }

            return Ok(new CouponResultDto
            {
                IsValid = true,
                Code = coupon.Code,
                DiscountType = coupon.DiscountType,
                DiscountValue = coupon.DiscountValue,
                DiscountAmount = discountAmount,
                Message = $"Coupon applied! Saved ₹{discountAmount} on this order."
            });
        }
    }
}

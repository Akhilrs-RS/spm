using System.ComponentModel.DataAnnotations;

namespace FreshCart.Api.Models.DTOs
{
    public class CouponValidateDto
    {
        [Required]
        public string Code { get; set; } = string.Empty;

        public decimal Subtotal { get; set; }
    }

    public class CouponResultDto
    {
        public bool IsValid { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string DiscountType { get; set; } = string.Empty;
        public decimal DiscountValue { get; set; }
        public decimal DiscountAmount { get; set; }
    }
}


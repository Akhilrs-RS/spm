using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreshCart.Api.Models.Entities
{
    public class Coupon
    {
        [Key]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string DiscountType { get; set; } = "percentage"; // percentage, flat

        [Column(TypeName = "decimal(10,2)")]
        public decimal DiscountValue { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal MinOrderAmount { get; set; }

        public bool IsActive { get; set; } = true;

        public string Description { get; set; } = string.Empty;
    }
}


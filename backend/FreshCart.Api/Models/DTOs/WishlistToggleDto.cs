using System.ComponentModel.DataAnnotations;

namespace FreshCart.Api.Models.DTOs
{
    public class WishlistToggleDto
    {
        public string? UserId { get; set; } = "user-1";

        [Required]
        public string ProductId { get; set; } = string.Empty;
    }

    public class WishlistToggleResultDto
    {
        public bool InWishlist { get; set; }
        public string ProductId { get; set; } = string.Empty;
        public int TotalCount { get; set; }
    }
}

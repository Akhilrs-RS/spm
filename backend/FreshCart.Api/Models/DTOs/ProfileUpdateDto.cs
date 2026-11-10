using System.ComponentModel.DataAnnotations;

namespace FreshCart.Api.Models.DTOs
{
    public class ProfileUpdateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(50)]
        public string AvatarColor { get; set; } = "bg-emerald-600";

        [MaxLength(50)]
        public string DietaryPreference { get; set; } = "all";

        public string? DeliveryInstruction { get; set; }
    }
}

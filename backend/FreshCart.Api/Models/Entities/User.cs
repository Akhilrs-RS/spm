using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class User
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = "user-1";

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(50)]
        public string AvatarColor { get; set; } = "bg-emerald-600";

        [MaxLength(50)]
        public string DietaryPreference { get; set; } = "all";

        public string? DeliveryInstruction { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Address> Addresses { get; set; } = new();

        [JsonIgnore]
        public List<Order> Orders { get; set; } = new();
    }
}

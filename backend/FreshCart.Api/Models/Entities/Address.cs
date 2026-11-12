using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class Address
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [MaxLength(50)]
        public string? UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [Required]
        [MaxLength(50)]
        public string Label { get; set; } = "Home";

        [Required]
        [MaxLength(255)]
        public string AddressLine { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = "Bengaluru";

        [Required]
        [MaxLength(10)]
        public string ZipCode { get; set; } = string.Empty;

        public bool IsDefault { get; set; }

        [MaxLength(50)]
        public string EstimatedMinutes { get; set; } = "15-25";
    }
}


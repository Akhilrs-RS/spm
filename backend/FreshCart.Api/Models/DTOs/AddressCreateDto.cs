using System.ComponentModel.DataAnnotations;

namespace FreshCart.Api.Models.DTOs
{
    public class AddressCreateDto
    {
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

        public bool IsDefault { get; set; } = false;

        public string EstimatedMinutes { get; set; } = "15-25";
    }
}


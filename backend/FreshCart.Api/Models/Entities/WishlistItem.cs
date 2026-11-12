using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class WishlistItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        public string UserId { get; set; } = "user-1";

        [Required]
        [MaxLength(50)]
        public string ProductId { get; set; } = string.Empty;

        public Product? Product { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string OrderId { get; set; } = string.Empty;

        [JsonIgnore]
        public Order? Order { get; set; }

        [Required]
        [MaxLength(50)]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string ProductName { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public int Quantity { get; set; } = 1;

        [MaxLength(50)]
        public string WeightOption { get; set; } = "Standard";

        public string ImageUrl { get; set; } = string.Empty;
    }
}


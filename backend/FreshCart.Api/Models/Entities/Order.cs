using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class Order
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string Status { get; set; } = "Placed"; // Placed, Packing, Out for Delivery, Delivered

        [MaxLength(100)]
        public string SlotLabel { get; set; } = "⚡ Express Delivery";

        [MaxLength(100)]
        public string SlotTime { get; set; } = "15-25 mins";

        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal DeliveryFee { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal DiscountAmount { get; set; }

        [MaxLength(50)]
        public string? PromoCode { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Taxes { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal GrandTotal { get; set; }

        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "upi";

        [JsonIgnore]
        public string DeliveryAddressJson { get; set; } = "{}";

        [NotMapped]
        public object? DeliveryAddress
        {
            get => string.IsNullOrEmpty(DeliveryAddressJson)
                ? null
                : JsonSerializer.Deserialize<object>(DeliveryAddressJson);
            set => DeliveryAddressJson = JsonSerializer.Serialize(value);
        }

        public List<OrderItem> Items { get; set; } = new();
    }
}


using System.ComponentModel.DataAnnotations;

namespace FreshCart.Api.Models.DTOs
{
    public class OrderCreateDto
    {
        public string? UserId { get; set; } = "user-1";

        public string SlotLabel { get; set; } = "⚡ Express Delivery";

        public string SlotTime { get; set; } = "15-25 mins";

        public string PaymentMethod { get; set; } = "upi";

        public string? PromoCode { get; set; }

        [Required]
        public DeliveryAddressDto DeliveryAddress { get; set; } = new();

        [Required]
        public List<OrderItemCreateDto> Items { get; set; } = new();
    }

    public class DeliveryAddressDto
    {
        public string Label { get; set; } = "Home";
        public string AddressLine { get; set; } = string.Empty;
        public string City { get; set; } = "Bengaluru";
        public string ZipCode { get; set; } = string.Empty;
        public string EstimatedMinutes { get; set; } = "15-25";
    }

    public class OrderItemCreateDto
    {
        [Required]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        public string ProductName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Quantity { get; set; } = 1;

        public string WeightOption { get; set; } = "Standard";

        public string ImageUrl { get; set; } = string.Empty;
    }
}

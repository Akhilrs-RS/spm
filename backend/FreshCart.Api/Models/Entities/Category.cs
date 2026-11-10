using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class Category
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Icon { get; set; } = "Store";

        [MaxLength(50)]
        public string? Badge { get; set; }

        [MaxLength(50)]
        public string? Color { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public List<Subcategory> Subcategories { get; set; } = new();

        [JsonIgnore]
        public List<Product> Products { get; set; } = new();
    }
}

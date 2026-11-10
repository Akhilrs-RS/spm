using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FreshCart.Api.Models.Entities
{
    public class Product
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string CategoryId { get; set; } = string.Empty;

        [JsonIgnore]
        public Category? Category { get; set; }

        [MaxLength(100)]
        public string? SubcategoryName { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal OriginalPrice { get; set; }

        public int Discount { get; set; }

        [MaxLength(20)]
        public string Unit { get; set; } = "pack";

        [JsonIgnore]
        public string WeightOptionsJson { get; set; } = "[]";

        [NotMapped]
        public List<string> WeightOptions
        {
            get => string.IsNullOrEmpty(WeightOptionsJson)
                ? new List<string>()
                : JsonSerializer.Deserialize<List<string>>(WeightOptionsJson) ?? new List<string>();
            set => WeightOptionsJson = JsonSerializer.Serialize(value);
        }

        [JsonIgnore]
        public string WeightMultipliersJson { get; set; } = "[]";

        [NotMapped]
        public List<decimal> WeightMultipliers
        {
            get => string.IsNullOrEmpty(WeightMultipliersJson)
                ? new List<decimal>()
                : JsonSerializer.Deserialize<List<decimal>>(WeightMultipliersJson) ?? new List<decimal>();
            set => WeightMultipliersJson = JsonSerializer.Serialize(value);
        }

        public string ImageUrl { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,1)")]
        public decimal Rating { get; set; } = 4.8m;

        public int ReviewsCount { get; set; }

        public bool IsOrganic { get; set; }

        [MaxLength(50)]
        public string? Badge { get; set; }

        public bool IsDeal { get; set; }

        public bool InStock { get; set; } = true;

        public string? Description { get; set; }
    }
}

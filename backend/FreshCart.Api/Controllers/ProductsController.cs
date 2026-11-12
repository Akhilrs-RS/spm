using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreshCart.Api.Data;
using FreshCart.Api.Models.Entities;

namespace FreshCart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] string? category,
            [FromQuery] string? subcategory,
            [FromQuery] string? search,
            [FromQuery] string? dietary,
            [FromQuery] bool? deal,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? sortBy)
        {
            var query = _context.Products.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all")
            {
                query = query.Where(p => p.CategoryId == category);
            }

            if (!string.IsNullOrWhiteSpace(subcategory) && subcategory.ToLower() != "all")
            {
                query = query.Where(p => p.SubcategoryName == subcategory);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(term) ||
                                         (p.Description != null && p.Description.ToLower().Contains(term)));
            }

            if (!string.IsNullOrWhiteSpace(dietary))
            {
                var d = dietary.Trim().ToLower();
                if (d == "organic")
                {
                    query = query.Where(p => p.IsOrganic);
                }
            }

            if (deal.HasValue && deal.Value)
            {
                query = query.Where(p => p.IsDeal);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            query = sortBy?.ToLower() switch
            {
                "price-low" => query.OrderBy(p => p.Price),
                "price-high" => query.OrderByDescending(p => p.Price),
                "rating" => query.OrderByDescending(p => p.Rating),
                "discount" => query.OrderByDescending(p => p.Discount),
                _ => query.OrderByDescending(p => p.ReviewsCount) // "popular" default
            };

            var products = await query.ToListAsync();
            return Ok(products);
        }

        // GET: api/products/flash-deals
        [HttpGet("flash-deals")]
        public async Task<ActionResult<IEnumerable<Product>>> GetFlashDeals()
        {
            var deals = await _context.Products
                .AsNoTracking()
                .Where(p => p.IsDeal)
                .OrderByDescending(p => p.Discount)
                .ToListAsync();

            return Ok(deals);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(string id)
        {
            var product = await _context.Products
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID '{id}' was not found." });
            }

            return Ok(product);
        }
    }
}


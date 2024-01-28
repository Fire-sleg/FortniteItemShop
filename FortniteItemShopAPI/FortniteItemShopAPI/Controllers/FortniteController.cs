using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FortniteItemShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FortniteController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;

        public FortniteController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [HttpGet("items")]
        public async Task<IActionResult> GetFortniteItems()
        {
            var apiUrl = "https://fortnite-api.com/v2/shop/br/combined";
            
            // Виконуємо асинхронний запит до API
            using (var client = _clientFactory.CreateClient())
            {
                var response = await client.GetFromJsonAsync<FortniteApiResponse>(apiUrl);

                if (response != null && response.Data != null)
                {
                    // Передаємо дані у представлення
                    return Ok(response);
                }
                return BadRequest();
            }
        }
    }

    public class FortniteApiResponse
    {
        public int Status { get; set; }
        public FortniteShopData Data { get; set; }
    }

    public class FortniteShopData
    {
        //public string Hash { get; set; }
        //public DateTime Date { get; set; }
        //public string VbuckIcon { get; set; }
        public FortniteShopCategory Featured { get; set; }
        public FortniteShopCategory Daily { get; set; }
        // Додайте інші необхідні вам властивості
    }

    public class FortniteShopCategory
    {
        public string Name { get; set; }
        public List<FortniteShopEntry> Entries { get; set; }
    }

    public class FortniteShopEntry
    {
        public int RegularPrice { get; set; }
        public int FinalPrice { get; set; }
        public FortniteShopBundle? Bundle { get; set; }
        public FortniteShopBanner? Banner { get; set; }
        public List<FortniteShopItem>? Items { get; set; }
        public string? SectionId { get; set; }
    }


    public class FortniteShopBundle
    {
        public string Name { get; set; }
        public string Info { get; set; }
        public string Image { get; set; }

    }

    public class FortniteShopItem
    {
        public string Name { get; set; }
        public Image Images { get; set; }
        public Series? Series { get; set; }
        public Rarity Rarity { get; set; }
        public ItemType Type { get; set; }
        //set
    }

    public class Image
    {
        public string? Icon { get; set; }
        public string? Featured { get; set; }
    }

    public class Series
    {
        public string Value { get; set; }
        public string Image { get; set; }
    }

    public class Rarity
    {
        public string Value { get; set; }
        public string DisplayValue { get; set; }
        public string BackendValue { get; set; }
    }

    public class ItemType
    {
        public string Value { get; set; }
        public string DisplayValue { get; set; }
        public string BackendValue { get; set; }
    }


    public class FortniteShopBanner
    {
        public string Value { get; set; }
        public string Intensity { get; set; }
        public string BackendValue { get; set; }
    }
}

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

                if (response != null && response.Status != null)
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
    }
}

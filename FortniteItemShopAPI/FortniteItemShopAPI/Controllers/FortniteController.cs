using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection;

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
                var bundles = response.Data.Featured.Entries.Where(e => e.Bundle != null);
                var entries = response.Data.Featured.Entries.Where(item1 => !bundles.Any(item2 => item2.SectionId == item1.SectionId)).ToList();
                
                
                //List<FortniteShopEntry> listEntries = new List<FortniteShopEntry>();
                List<List<FortniteShopEntry>> uniqueEntries = new List<List<FortniteShopEntry>>();

                //for (int i = 0; i < entries.Count; i++)
                //{
                //    HashSet<FortniteShopEntry> hashSetEntries = new HashSet<FortniteShopEntry>();

                //    for (int j = i+1; j<entries.Count; j++)
                //    {
                //        //var entry = entries[i].Items.Where(e => entries[j].Items.Where(f => e.Set.Value == f.Set.Value));
                //        //if ()
                //        //{
                //        //    hashSetEntries.Add(entries[i]);
                //        //}

                //    }
                //    List<FortniteShopEntry> temp = hashSetEntries.ToList();
                //    uniqueEntries.Add(temp);
                //}
                Dictionary<string, HashSet<FortniteShopEntry>> setEntries = new Dictionary<string, HashSet<FortniteShopEntry>>();
                List<FortniteShopEntry> unSetEntries = new List<FortniteShopEntry>();
                entries.ForEach(entry => 
                {
                    if (entry.Items != null)
                    {
                        entry.Items.ForEach((item) =>
                        {
                            string? setValue = item.Set != null ? item.Set.Value : null;

                            if (setValue != null)
                            {
                                if (!setEntries.ContainsKey(setValue))
                                {
                                    setEntries[setValue] = new HashSet<FortniteShopEntry>();
                                }
                                setEntries[setValue].Add(entry);
                            }
                            else
                            {
                                unSetEntries.Add(entry);
                            }
                        });
                    }
                });
                foreach (var partOfDictionary in setEntries)
                {
                    if (setEntries.ContainsKey(partOfDictionary.Key))
                    {
                        List<FortniteShopEntry> temp = setEntries[partOfDictionary.Key].ToList();
                        uniqueEntries.Add(temp);
                    }
                }
                

                if (response != null && response.Data != null)
                {
                    var apiResponse = new ApiResponse()
                    {
                        FortniteApiResponse = response,
                        Bundles = bundles,
                        Entries = entries,
                        UniqueEntries = uniqueEntries
                    };
                    // Передаємо дані у представлення
                    return Ok(apiResponse);
                }
                return BadRequest();
            }
        }
    }
    public class ApiResponse
    {
        public FortniteApiResponse FortniteApiResponse { get; set; }
        public IEnumerable<FortniteShopEntry> Bundles { get; set; }
        public List<FortniteShopEntry> Entries { get; set; }
        public List<List<FortniteShopEntry>> UniqueEntries { get; set; }
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
        public string? OfferId { get; set; }
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
        public ItemSet Set { get; set; }
    }
    public class ItemSet
    {
        public string Value { get; set; }
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

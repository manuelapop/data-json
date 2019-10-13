using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DisplayData.Controllers
{
    [Route("api/[controller]/[action]")]
    public class DataController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetData(string type)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                    var uri = "http://jsonplaceholder.typicode.com/" + type;

                    using (HttpResponseMessage response = await client.GetAsync(uri))
                    {
                        response.EnsureSuccessStatusCode();
                        string responseBody = await response.Content.ReadAsStringAsync();
                        var results = JsonConvert.DeserializeObject(responseBody);

                        return Ok(results);
                    }
                }
            }
            catch (Exception ex)
            {
                return Ok("error");
            }
            
        }
    }
}

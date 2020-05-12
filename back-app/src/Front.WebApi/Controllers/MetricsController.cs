using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Front.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Streaming.Publishers;

namespace Front.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        private readonly InfinitePublisherFactory<Product> _productPublisherFactory;

        public MetricsController(InfinitePublisherFactory<Product> productPublisher)
        {
            _productPublisherFactory = productPublisher;
        }

        // GET api/values/5
        [HttpGet]
        public ActionResult<string> Get()
        {
            return JsonSerializer.Serialize(
                new
                {
                    Publisher = _productPublisherFactory.Publishers.Select(publisher =>
                        new
                        {
                            publisher.PublisherId,
                            publisher.Subscribers
                        }),
                }
                ,
                new JsonSerializerOptions { WriteIndented = true });
        }
    }
}

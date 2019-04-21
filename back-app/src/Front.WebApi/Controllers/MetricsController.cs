using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Front.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            return JsonConvert.SerializeObject(
                _productPublisherFactory.Publishers.Select(publisher =>
                new
                {
                    publisher.PublisherId,
                    publisher.Consumers
                }),
                Formatting.Indented);

        }
    }
}

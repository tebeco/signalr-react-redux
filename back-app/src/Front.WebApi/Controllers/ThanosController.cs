using Front.WebApi.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Front.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ThanosController : ControllerBase
    {
        private readonly IHubContext<FrontClientHub> _frontHubContext;

        public ThanosController(IHubContext<FrontClientHub> frontHubContext)
        {
            _frontHubContext = frontHubContext;
        }

        [HttpGet("snap")]
        public async Task Snap()
        {
            var connectionIds = FrontClientHub.ClientTrackers.Select(kvp => kvp.Key).ToList();
            var rnd = new Random();
            var halfCount = connectionIds.Count / 2;

            for (int i = 0; i < halfCount; i++)
            {
                var spiderman = connectionIds[rnd.Next(0, connectionIds.Count)];
                connectionIds.Remove(spiderman);
                await _frontHubContext.Clients.Client(spiderman).SendAsync("disconnect").ConfigureAwait(false);
            }
        }
    }
}

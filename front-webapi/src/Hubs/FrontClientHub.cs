using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Front.WebApi.Hubs
{
    public class FrontClientHub : Hub
    {
        private Dictionary<string, SharedProductPublisher> sharedProductPublisher = new Dictionary<string, SharedProductPublisher>();

        public ChannelReader<Product> SubscribeToSharedProduct(string productId)
        {
            if (!sharedProductPublisher.ContainsKey(productId))
            {
                sharedProductPublisher[productId] = new SharedProductPublisher(productId);
            }

            return sharedProductPublisher[productId].ProductChannel.Reader;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var publishers = sharedProductPublisher.ToList();
            sharedProductPublisher = new Dictionary<string, SharedProductPublisher>();

            publishers.ForEach(publisher => publisher.Value.Dispose());

            return Task.CompletedTask;
        }
    }
}

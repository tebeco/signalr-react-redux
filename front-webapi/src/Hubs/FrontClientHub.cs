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
        private Dictionary<string, InfiniteProductPublisher> infiniteProductPublisher = new Dictionary<string, InfiniteProductPublisher>();
        

        public ChannelReader<Product> SubscribeToInfiniteProduct(string productId)
        {
            if (!infiniteProductPublisher.ContainsKey(productId))
            {
                lock (infiniteProductPublisher)
                {
                    if (!infiniteProductPublisher.ContainsKey(productId))
                    {
                        infiniteProductPublisher[productId] = new InfiniteProductPublisher(productId, TimeSpan.FromMilliseconds(200));
                    }
                }
            }
            var publisher = infiniteProductPublisher[productId];

            return publisher.ProductChannel.Reader;
        }

        public ChannelReader<Product> SubscribeToLimitedProduct(string productId)
        {
            var publisher = new LimitedProductPublisher(productId, 3, TimeSpan.FromMilliseconds(200));
            return publisher.ProductChannel.Reader;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var publishers = infiniteProductPublisher.Values.ToList();
            infiniteProductPublisher = new Dictionary<string, InfiniteProductPublisher>();

            publishers.ForEach(publisher => publisher.Dispose());

            return Task.CompletedTask;
        }
    }
}

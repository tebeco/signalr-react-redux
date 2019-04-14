using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
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

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Task.Yield();

            var publishers = sharedProductPublisher.ToList();
            sharedProductPublisher = new Dictionary<string, SharedProductPublisher>();

            publishers.ForEach(publisher => publisher.Value.Dispose());
        }
    }

    public class SharedProductPublisher : IDisposable
    {
        private readonly Random rnd = new Random();
        private readonly Timer timer;
        private readonly string productId;

        public Channel<Product> ProductChannel { get; }

        public SharedProductPublisher(string productId)
        {
            this.productId = productId;

            ProductChannel = Channel.CreateUnbounded<Product>();
            timer = new Timer(_ => { ProductChannel.Writer.TryWrite(GetNextProduct()); }, null, 0, 500);
        }

        private Product GetNextProduct() => new Product { Id = productId, Price = rnd.NextDouble() };

        public void Dispose()
        {
            ProductChannel.Writer.Complete();
            timer.Dispose();
        }
    }

    public struct Product
    {
        public string Id;
        public double Price;
    }
}

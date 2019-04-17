using System;
using System.Threading;
using System.Threading.Channels;

namespace Front.WebApi.Hubs
{
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

        private Product GetNextProduct() => new Product { ProductId = productId, Price = rnd.NextDouble() };

        public void Dispose()
        {
            ProductChannel.Writer.Complete();
            timer.Dispose();
        }
    }
}

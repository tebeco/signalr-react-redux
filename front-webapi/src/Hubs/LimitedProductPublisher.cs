using System;
using System.Reactive.Linq;
using System.Threading.Channels;

namespace Front.WebApi.Hubs
{
    public class LimitedProductPublisher: IDisposable
    {
        private readonly IDisposable subscription;

        public Channel<Product> ProductChannel { get; }

        public LimitedProductPublisher(string productId, int count, TimeSpan interval)
        {
            ProductChannel = Channel.CreateUnbounded<Product>();

            subscription = Observable.Interval(interval)
                                    .Select((_, index) => Product.GetRandomProduct(productId))
                                    .Take(count)
                                    .Subscribe(
                                       product => ProductChannel.Writer.TryWrite(product),
                                       _ => ProductChannel.Writer.Complete(),
                                       () => ProductChannel.Writer.Complete()
                                    );
        }

        public void Dispose()
        {
            ProductChannel.Writer.Complete();
            subscription.Dispose();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Channels;

namespace Streaming.WebApi
{
    public class InfiniteProductPublisher : IDisposable
    {
        private readonly IDisposable _subscription;

        public Channel<Product> ProductChannel { get; }

        public InfiniteProductPublisher(string productId, TimeSpan interval)
        {
            ProductChannel = Channel.CreateUnbounded<Product>();
            _subscription = Observable.Interval(interval)
                                    .Select((_, index) => Product.GetRandomProduct(productId))
                                    .Subscribe(
                                       product => ProductChannel.Writer.TryWrite(product),
                                       _ => ProductChannel.Writer.Complete(),
                                       () => ProductChannel.Writer.Complete()
                                    );
        }


        public void Dispose()
        {
            ProductChannel.Writer.Complete();
            _subscription.Dispose();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Channels;

namespace Streaming.Publishers
{
    public class InfinitePublisher<TData> : IDisposable
    {
        private readonly IDisposable _subscription;

        public Channel<TData> DataChannel { get; }

        public InfinitePublisher(string publisherId, TimeSpan interval, Func<string, TData> factory)
        {
            DataChannel = Channel.CreateUnbounded<TData>(new UnboundedChannelOptions() { SingleReader = false });
            _subscription = Observable.Interval(interval)
                                    .Select((_, index) => factory(publisherId))
                                    .Subscribe(
                                        item => DataChannel.Writer.TryWrite(item),
                                        _ => DataChannel.Writer.Complete(),
                                        () => DataChannel.Writer.Complete()
                                    );
        }

        public void Dispose()
        {
            DataChannel.Writer.Complete();
            _subscription.Dispose();
        }
    }
}

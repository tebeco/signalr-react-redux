using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Streaming.Publishers
{
    public class InfinitePublisher<TData> : IDisposable
    {
        private readonly IDisposable _subscription;
        private readonly ConcurrentDictionary<string, Channel<TData>> consumers = new ConcurrentDictionary<string, Channel<TData>>();
            
        public InfinitePublisher(string publisherId, TimeSpan interval, Func<string, TData> factory)
        {
            _subscription = Observable.Interval(interval)
                                    .Select((_, index) => factory(publisherId))
                                    .Subscribe(
                                        data => PublishAll(data),
                                        _ => TryCompleteAll(),
                                        () => TryCompleteAll()
                                    );
        }

        public ChannelReader<TData> AddConsumer(string consumerId)
        {
            var channel = Channel.CreateUnbounded<TData>();
            consumers.GetOrAdd(consumerId, channel);
            return channel.Reader;
        }

        public void PublishAll(TData data)
        {
            Parallel.ForEach(consumers.ToArray(),
                             channel =>
                             {
                                 channel.Value.Writer.TryWrite(data);
                             });
        }

        public void TryCompleteAll()
        {
            Parallel.ForEach(consumers.ToArray(),
                                 channel =>
                                 {
                                     channel.Value.Writer.TryComplete();
                                 });
        }

        public void Dispose()
        {
            TryCompleteAll();
            _subscription.Dispose();
        }
    }
}

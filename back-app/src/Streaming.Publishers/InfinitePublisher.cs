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
        private readonly ConcurrentDictionary<string, Channel<TData>> _subscribers = new ConcurrentDictionary<string, Channel<TData>>();

        public InfinitePublisher(string publisherId, TimeSpan interval, Func<string, TData> factory)
        {
            _subscription = Observable.Interval(interval)
                                    .Select((_, index) => factory(PublisherId))
                                    .Subscribe(
                                        data => PublishAll(data),
                                        _ => TryCompleteAll(),
                                        () => TryCompleteAll()
                                    );
            PublisherId = publisherId;
        }

        public ChannelReader<TData> Subscribe(string subscriberId)
        {
            var channel = Channel.CreateUnbounded<TData>();
            _subscribers.GetOrAdd(subscriberId, channel);
            return channel.Reader;
        }

        public void PublishAll(TData data)
        {
            Parallel.ForEach(_subscribers.Values.ToArray(),
                             channel =>
                             {
                                 channel.Writer.TryWrite(data);
                             });

        }

        public void TryCompleteAll()
        {
            Parallel.ForEach(_subscribers.Values.ToArray(),
                             channel =>
                             {
                                 channel.Writer.TryComplete();
                             });
        }

        public void Unsubscribe(string connectionId)
        {
            _subscribers.TryRemove(connectionId, out var _);
        }

        public IEnumerable<string> Subscribers
        {
            get
            {
                return _subscribers.Keys.ToArray();
            }
        }

        public string PublisherId { get; }

        public void Dispose()
        {
            TryCompleteAll();
            _subscription.Dispose();
        }
    }
}

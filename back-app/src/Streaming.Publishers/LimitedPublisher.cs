using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Channels;

namespace Streaming.Publishers
{
    public class LimitedPublisher<TData> : IDisposable
    {
        private readonly IDisposable _subscription;

        public Channel<TData> DataChannel { get; }

        

        public LimitedPublisher(string publisherId, int count, TimeSpan interval, Func<string, TData> factory)
        {
            DataChannel = Channel.CreateUnbounded<TData>();
            _subscription = Observable.Interval(interval)
                                    .Select((_, index) => factory(publisherId))
                                    .Take(count)
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

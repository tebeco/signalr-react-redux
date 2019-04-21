using System;
using System.Collections.Concurrent;

namespace Streaming.Publishers
{
    public class InfinitePublisherFactory<TData>
    {
        private readonly IDataFactory<TData> _factory;
        private readonly ConcurrentDictionary<string, InfinitePublisher<TData>> _infinitePublisher = new ConcurrentDictionary<string, InfinitePublisher<TData>>();

        public InfinitePublisherFactory(IDataFactory<TData> factory)
        {
            _factory = factory;
        }

        public InfinitePublisher<TData> GetOrCreatePublisher(string publisherId)
        {
            return _infinitePublisher.GetOrAdd(publisherId, (id) => new InfinitePublisher<TData>(id, TimeSpan.FromMilliseconds(2000), (dataId) => _factory.Create(dataId)));
        }
    }

    public class LimitedPublisherFactory<TData>
    {
        private readonly IDataFactory<TData> _factory;

        public LimitedPublisherFactory(IDataFactory<TData> factory)
        {
            _factory = factory;
        }

        public LimitedPublisher<TData> CreatePublisher(string publisherId, int tickCount, TimeSpan interval)
        {
            return new LimitedPublisher<TData>(publisherId, tickCount, interval, (dataId) => _factory.Create(dataId));
        }
    }
}

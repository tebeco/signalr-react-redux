using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace Streaming.Publishers
{
    public class InfinitePublisherFactory<TData>
    {
        private readonly IDataFactory<TData> _factory;
        private readonly ConcurrentDictionary<string, InfinitePublisher<TData>> _infinitePublishers = new ConcurrentDictionary<string, InfinitePublisher<TData>>();

        public InfinitePublisherFactory(IDataFactory<TData> factory)
        {
            _factory = factory;
        }

        public InfinitePublisher<TData> GetOrCreatePublisher(string publisherId)
        {
            return _infinitePublishers.GetOrAdd(publisherId, (id) => new InfinitePublisher<TData>(id, TimeSpan.FromMilliseconds(2000), (dataId) => _factory.Create(dataId)));
        }

        public IEnumerable<InfinitePublisher<TData>> Publishers
        {
            get
            {
                return _infinitePublishers.ToArray().Select(kvp => kvp.Value);
            }
        }
    }
}

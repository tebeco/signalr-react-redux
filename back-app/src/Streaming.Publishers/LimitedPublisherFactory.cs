using System;

namespace Streaming.Publishers
{
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

using System.Collections.Concurrent;
using Front.WebApi.Models;
using Streaming.Publishers;

namespace Front.WebApi.Hubs
{
    public class ClientTracker
    {
        private readonly ConcurrentDictionary<string, InfinitePublisher<Product>> _clientTrackers = new ConcurrentDictionary<string, InfinitePublisher<Product>>();

        internal void Link(string connectionId, InfinitePublisher<Product> publisher)
        {
            _clientTrackers.GetOrAdd(connectionId, publisher);
        }

        internal void Cleanup(string connectionId)
        {
            if (_clientTrackers.TryGetValue(connectionId, out var publisher))
            {
                publisher.Unsubscribe(connectionId);
            }
        }
    }
}

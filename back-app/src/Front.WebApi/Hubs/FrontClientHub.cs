using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Channels;
using Streaming.Publishers;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Front.WebApi.Models;

namespace Front.WebApi.Hubs
{
    public class FrontClientHub : Hub
    {
        private readonly InfinitePublisherFactory<Product> _infiniteProductPublisherFactory;
        private readonly LimitedPublisherFactory<Product> _limitedProductPublisherFactory;

        internal static readonly ConcurrentDictionary<string, InfinitePublisher<Product>> ClientTrackers = new ConcurrentDictionary<string, InfinitePublisher<Product>>();

        public FrontClientHub(InfinitePublisherFactory<Product> infiniteProductPublisherFactory, LimitedPublisherFactory<Product> limitedPublisherFactory)
        {
            _infiniteProductPublisherFactory = infiniteProductPublisherFactory;
            _limitedProductPublisherFactory = limitedPublisherFactory;
        }

        public ChannelReader<Product> SubscribeToInfiniteProduct(string productId)
        {
            var publisher = _infiniteProductPublisherFactory.GetOrCreatePublisher(productId);
            ClientTrackers.GetOrAdd(Context.ConnectionId, publisher);
            return publisher.AddConsumer(Context.ConnectionId);
        }

        public ChannelReader<Product> SubscribeToLimitedProduct(string productId)
        {
            var publisher = _limitedProductPublisherFactory.CreatePublisher(productId, 5, TimeSpan.FromMilliseconds(500));
            return publisher.DataChannel.Reader;

        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if(ClientTrackers.TryGetValue(Context.ConnectionId, out var publisher))
            {
                publisher.RemoveConsumer(Context.ConnectionId);
            }

            return base.OnDisconnectedAsync(exception);
        }
    }
}

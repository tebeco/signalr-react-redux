using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Channels;
using Streaming.Publishers;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Front.WebApi.Models;
using System.Diagnostics;
using System.Linq;

namespace Front.WebApi.Hubs
{
    public class FrontClientHub : Hub
    {
        private readonly InfinitePublisherFactory<Product> _infiniteProductPublisherFactory;
        private readonly LimitedPublisherFactory<Product> _limitedProductPublisherFactory;
        private readonly ClientTracker _clientTracker;

        public FrontClientHub(InfinitePublisherFactory<Product> infiniteProductPublisherFactory, LimitedPublisherFactory<Product> limitedPublisherFactory, ClientTracker clientTracker)
        {
            _infiniteProductPublisherFactory = infiniteProductPublisherFactory;
            _limitedProductPublisherFactory = limitedPublisherFactory;
            _clientTracker = clientTracker;
        }

        public ChannelReader<Product> SubscribeToInfiniteProduct(string productId)
        {
            var publisher = _infiniteProductPublisherFactory.GetOrCreatePublisher(productId);
            _clientTracker.Link(Context.ConnectionId, publisher);

            return publisher.Subscribe(Context.ConnectionId);
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
            _clientTracker.Cleanup(Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }
    }
}

using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Channels;
using Streaming.Publishers;

namespace Front.WebApi.Hubs
{
    public class FrontClientHub : Hub
    {
        private readonly InfinitePublisherFactory<Product> _infiniteProductPublisherFactory;
        private readonly LimitedPublisherFactory<Product> _limitedProductPublisherFactory;

        public FrontClientHub(InfinitePublisherFactory<Product> infiniteProductPublisherFactory, LimitedPublisherFactory<Product> limitedPublisherFactory)
        {
            _infiniteProductPublisherFactory = infiniteProductPublisherFactory;
            _limitedProductPublisherFactory = limitedPublisherFactory;
        }

        public ChannelReader<Product> SubscribeToInfiniteProduct(string productId)
        {
            var publisher = _infiniteProductPublisherFactory.GetOrCreatePublisher(productId);
            return publisher.DataChannel.Reader;
        }

        public ChannelReader<Product> SubscribeToLimitedProduct(string productId)
        {
            var publisher = _limitedProductPublisherFactory.CreatePublisher(productId, 5, TimeSpan.FromMilliseconds(500));
            return publisher.DataChannel.Reader;
        }
    }
}

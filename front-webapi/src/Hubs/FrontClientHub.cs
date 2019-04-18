using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Front.WebApi.Hubs
{
    public class FrontClientHub : Hub
    {
        private Dictionary<string, InfiniteProductPublisher> infiniteProductPublisher = new Dictionary<string, InfiniteProductPublisher>();

        public ChannelReader<Product> SubscribeToInfiniteProduct(string productId)
        {
            if (!infiniteProductPublisher.ContainsKey(productId))
            {
                infiniteProductPublisher[productId] = new InfiniteProductPublisher(productId, TimeSpan.FromMilliseconds(200));
            }

            return infiniteProductPublisher[productId].ProductChannel.Reader;
        }

        // Ludo me dit que faire un analyzer roslyn
        // * qui genere un package npm a chaque build
        // * cree les typings equivalent aux methodes du hub "on the fly"
        // * et du coup permettrai de failfast la compile du front lors de rename
        // Mais je lui ai dit que je l'emmerde
        // Il fera une prez' sur "Les analyzer Roslyn en .net" ou il me montrera qu'en fait il avait raison
        // En attendant je confirme "Je t'emmerde ludo"
        public ChannelReader<Product> SubscribeToLimitedProduct(string productId)
        {
            var publisher = new LimitedProductPublisher(productId, 3, TimeSpan.FromMilliseconds(200));
            return publisher.ProductChannel.Reader;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var publishers = infiniteProductPublisher.Values.ToList();
            infiniteProductPublisher = new Dictionary<string, InfiniteProductPublisher>();

            // Ludo me dit qu'une boucle while serait plus performant
            // Mais je lui ai dit que je l'emmerde
            // Il fera une prez' sur la partie Performance en .Net ou il me montrera qu'en fait il avait raison
            // En attendant je confirme "Je t'emmerde ludo"
            publishers.ForEach(publisher => publisher.Dispose());

            return Task.CompletedTask;
        }
    }
}

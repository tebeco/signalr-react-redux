using System;
using Streaming.Publishers;

namespace Front.WebApi.Hubs
{
    public class ProductFactory : IDataFactory<Product>
    {
        private readonly Random _rnd = new Random();

        public Product Create(string productId)
        {
            return new Product { ProductId = productId, Price = _rnd.NextDouble() };
        }
    }
}

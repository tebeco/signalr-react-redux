using System;

namespace Front.WebApi.Hubs
{
    public struct Product
    {
        private static Random rnd = new Random();

        public string ProductId;
        public double Price;

        internal static Product GetRandomProduct(string productId)
        {
            return new Product { ProductId = productId, Price = rnd.NextDouble() };
        }
    }
}

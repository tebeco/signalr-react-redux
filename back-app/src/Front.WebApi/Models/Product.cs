using MessagePack;

namespace Front.WebApi.Models
{
    public struct Product
    {
        [Key("productId")]
        public string ProductId { get; set; }

        [Key("productId")]
        public double Price { get; set; }
    }
}

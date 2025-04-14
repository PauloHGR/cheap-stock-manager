namespace ApiMinerCheapStocks.DTOs
{
    public class WalletStockRequest
    {
        public Guid WalletId { get; set; }
        public string Ticker { get; set; }
        public int Quantity { get; set; }
    }
}

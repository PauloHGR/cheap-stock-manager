namespace ApiMinerCheapStocks.DTOs
{
    public class WalletStockResponse
    {
        public Guid Id { get; set; }
        public Guid WalletId { get; set; }
        public string Ticker { get; set; }
        public int Quantity { get; set; }
        public string MinningDate { get; set; }

    }
}

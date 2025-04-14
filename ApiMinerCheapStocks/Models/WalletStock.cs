namespace ApiMinerCheapStocks.Models
{
    public class WalletStock
    {
        public Guid Id { get; set; }
        public Guid StockId { get; set; }
        public Guid WalletId { get; set; }
        public string Ticker { get; set; }
        public int Quantity { get; set; }
        public DateTime MinningDate { get; set; }


        public Stock? Stock { get; set; }
        public Wallet? Wallet { get; set; }
    }
}

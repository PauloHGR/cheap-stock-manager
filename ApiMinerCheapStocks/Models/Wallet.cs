namespace ApiMinerCheapStocks.Models
{
    public class Wallet
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double MoneyApplied { get; set; }
        public List<WalletStock>? WalletStocks { get; set; }

    }
}

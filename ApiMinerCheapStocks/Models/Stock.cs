using System.Text.Json.Serialization;

namespace ApiMinerCheapStocks.Models
{
    public class Stock
    {
        public Guid Id { get; set; }
        [JsonPropertyName("PRECO")]
        public double Price { get; set; }
        [JsonPropertyName("TICKER")]
        public string Ticker { get; set; }
        [JsonPropertyName("ROE")]
        public double Roe { get; set; }
        [JsonPropertyName("ROIC")]
        public double Roic { get; set; }
        [JsonPropertyName("MARGEM EBIT")]
        public double? MargemEbit { get; set; }
        [JsonPropertyName("EV/EBIT")]
        public double EvEbit { get; set; }
        [JsonPropertyName(" LPA")]
        public double Lpa { get; set; }
        [JsonPropertyName("ROIC_Rank")]
        public int RoicRank { get; set; }
        [JsonPropertyName("EY_Rank")]
        public int EyRank { get; set; }
        [JsonPropertyName("Final_Rank")]
        public int FinalRank { get; set; }
        [JsonPropertyName("Index")]
        public int Index { get; set; }


        public DateTime MinningDate { get; set; }
        public List<WalletStock>? WalletStocks { get; set; }

    }
}
